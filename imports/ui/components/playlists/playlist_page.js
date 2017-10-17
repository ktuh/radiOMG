import './playlist_page.html';
import { Meteor } from 'meteor/meteor';
import Comments from '../../../api/comments/comments_collection.js';
import Playlists from '../../../api/playlists/playlists_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import moment from "moment-timezone";

Template.playlistPage.onCreated(function(){
  var self = this;

  self.subscribe('activeShows');

  self.autorun(function(){
    var id = parseInt(FlowRouter.getParam('id'));

    self.subscribe("playlist", id, {
      onReady: function() {
        var playlist = Playlists.findOne({ spinPlaylistId: id });

        Meteor.call("getPlaylist", parseInt(playlist.spinPlaylistId), function(error, result) {
          if (!error && result)
            Session.set("currentPlaylist", result);
        });
        self.subscribe('showBySpinitronId', playlist.showId, {
          onReady: function() {
            self.subscribe('comments', playlist._id);
          }
        });
      }
    });
  });

  self.subscribe("playlistsLimited", {sort: {showDate: -1, spinPlaylistId: -1}, limit: 12});
});


Template.playlistPage.helpers({
  comments: () => {
    var id = parseInt(FlowRouter.getParam('id'));
    var playlist = Playlists.findOne({ spinPlaylistId: id });

    return Comments.find({ postId: playlist._id });
  },
  songs: () => Session.get("currentPlaylist"),
  showName: () => Shows.findOne({ showId: Playlists.findOne().showId }).showName,
  showNameFromId: (id) => Shows.findOne({ showId: id }).showName,
  showDateOfCurrent: () => moment(Playlists.findOne().showDate).tz("US/Hawaii").format("LL"),
  showSlug: () => Shows.findOne({ showId: Playlists.findOne().showId }).slug,
  showTimeFromId: (id) => Shows.findOne({showId: id}).startHour,
  showEndFromId: (id) => Shows.findOne({showId: id}).endHour,
  showImage: () => {
    var show = Shows.findOne({ showId: Playlists.findOne().showId });
    return (show === undefined) ? false : show.featuredImage.url;
  },
  timeFromHours: (h1, h2) => moment(h1, "HH").format('h') + "-" + moment(h2, "HH").format('hA'),
  timeBeautify: (time) => moment(time.substring(0, time.length - 3), 'HH:mm').format('hh:mm a'),
  dateFormat: (date) => moment(date).format("ddd. MMMM DD, YYYY"),
  getSidebarData: () => {
    var playlistDates = Playlists.find({}, {sort: {showDate: -1, spinPlaylistId: -1}, limit: 12}).fetch();
    var uniqDates = _.uniq(_.pluck(playlistDates, "showDate"), true, (date) => +date);
    var a = [];
    for (var p = 0; p < uniqDates.length; p++) {
      var r = {};
      r.date = uniqDates[p];
      r.shows = _.filter(playlistDates, (obj) => +obj.showDate === +uniqDates[p]);
      a.push(r);
    }
    return a;
  }
});
