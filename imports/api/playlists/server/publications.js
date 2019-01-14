import { Meteor } from 'meteor/meteor';
import Playlists from '../playlists_collection.js';
import NowPlaying from '../now_playing.js';
import { currentPlaylist } from '../../../startup/lib/helpers.js';
import { check } from 'meteor/check';

Meteor.publish('playlist', function (id) {
  check(id, Number);
  return Playlists.find({ spinPlaylistId: id });
});

Meteor.publish('playlists', function() {
  return Playlists.find({});
});

Meteor.publish('playlistsLimited', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Playlists.find({}, options);
});

Meteor.publish('currentPlaylist', currentPlaylist);

Meteor.publish('nowPlaying', function() {
  return NowPlaying.find({});
});

Meteor.publish('showPlaylists', function(id) {
  check(id, Number);
  return Playlists.find({ showId: id }, { sort: { showDate: -1 } });
});
