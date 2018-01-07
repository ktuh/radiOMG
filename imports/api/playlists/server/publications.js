import { Meteor } from 'meteor/meteor';
import Playlists from '../playlists_collection.js';
import NowPlaying from '../now_playing.js';
import { publishPagination } from 'meteor/kurounin:pagination';

Meteor.publish('playlist', function (id) {
  check(id, Number);
  return Playlists.find({ spinPlaylistId: id });
});

Meteor.publish('playlistsLimited', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Playlists.find({}, options);
});

Meteor.publish('currentPlaylist', function() {
  return Playlists.find({$where: function() {
    return this.showDate.getYear() === new Date().getYear() &&
           this.showDate.getMonth() === new Date().getMonth() &&
           this.showDate.getDate() === new Date().getDate() &&
           parseInt(this.startTime.split(":")[0]) <= new Date().getHours() &&
           (parseInt(this.endTime.split(":")[0]) > new Date().getHours() ||
           this.endTime === "00:00:00"); }
  });
});

Meteor.publish('nowPlaying', function() {
  return NowPlaying.find({});
});

Meteor.publish('showPlaylists', function(id) {
  check(id, Number);
  return Playlists.find({ showId: id });
});

publishPagination(Playlists);
