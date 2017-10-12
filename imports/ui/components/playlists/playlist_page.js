import './playlist_page.html';
import { Meteor } from 'meteor/meteor';
import Comments from '../../../api/comments/comments_collection.js';
import Playlists from '../../../api/playlists/playlists_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import moment from "moment-timezone";

Template.playlistPage.onCreated(function(){
  var self = this;

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
});


Template.playlistPage.helpers({
  comments: () => {
    var id = parseInt(FlowRouter.getParam('id'));
    var playlist = Playlists.findOne({ spinPlaylistId: id });

    return Comments.find({ postId: playlist._id });
  },
  songs: () => Session.get("currentPlaylist"),
  showName: () => Shows.findOne({ showId: Playlists.findOne().showId }).showName,
  showDate: () => moment(Playlists.findOne().showDate).tz("US/Hawaii").format("LL"),
  showSlug: () => Shows.findOne({ showId: Playlists.findOne().showId }).slug,
  showImage: () => {
    var show = Shows.findOne({ showId: Playlists.findOne().showId })

    return (show === undefined) ? false : show.featuredImage.url;
  },
  truncated: (str) => str.substring(0, str.length - 3)
});
