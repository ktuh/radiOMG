import './playlist_list.html';
import { Template } from 'meteor/templating';
import Playlists from '../../../api/playlists/playlists_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { pagination } from 'meteor/kurounin:pagination';
import { moment } from 'meteor/momentjs:moment';

Template.playlistList.onCreated(function() {
  var self = this;

  self.pagination = new Meteor.Pagination(Playlists, { sort: { showDate: -1 }, perPage: 7 });
  self.autorun(function() {
    self.subscribe('activeShows');
    self.subscribe('playlistsLimited', { limit: 1, sort: { showDate: -1 }}, {
      onReady: function() {
        var playlist = Playlists.findOne({}, { limit: 1, sort: { showDate: -1 }});

        Meteor.call("getPlaylist", parseInt(playlist.spinPlaylistId), function(error, result) {
          if (!error && result) {
            Session.set("currentPlaylist", result);
          }
        });
      }
    });
  });
});

Template.playlistList.helpers({
  latestSongs: () => Session.get("currentPlaylist"),
  img: (id) => Shows.findOne({ showId: id }).featuredImage.url,
  showName: (id) => Shows.findOne({ showId: id }).showName,
  date: (showDate) => moment(showDate).format('dddd, h:mm a,<br>MMM DD YYYY'),
  ready: () => Template.instance().pagination.ready(),
  docs: () => Template.instance().pagination.getPage(),
  tempPag: () => Template.instance().pagination,
  latestShowName: () => {
    var list = Playlists.findOne({}, { sort: { showDate: -1 }});
    return Shows.findOne({ showId: list.showId }).showName
  },
  latestShowDay: function () {
    var list = Playlists.findOne({}, { sort: { showDate: -1 }});
    return moment(list.showDate).format('dddd');
  },
  latestShowStartTime: function () {
    var list = Playlists.findOne({}, { sort: { showDate: -1 }});
    return moment(list.showDate).format('h A');
  },
  latestShowSlug: () => {
    var list = Playlists.findOne({}, { sort: { showDate: -1 }});
    return Shows.findOne({ showId: list.showId }).slug
  },
  latestShowImage: () => {
    var list = Playlists.findOne({}, { sort: { showDate: -1 }});
    var show = Shows.findOne({ showId: list.showId });

    return (show === undefined || show.featuredImage === undefined)
           ? false : show.featuredImage.url;
  },
  latestShowHost: () => {
    var list = Playlists.findOne({}, { sort: { showDate: -1 }});
    var show = Shows.findOne({ showId: list.showId });

    return (show === undefined || show.featuredImage === undefined)
           ? false : show.host;
  },
  truncated: (str) => str.substring(0, str.length - 3)
});
