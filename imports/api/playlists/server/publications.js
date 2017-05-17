import { Meteor } from 'meteor/meteor';
import { Playlists } from '../playlists_collection.js';
import { NowPlaying } from '../now_playing.js';
import { pagination } from 'meteor/kurounin:pagination';

Meteor.publish('playlist', function (id) {
  check(id, Number);
  return Playlists.find({ spinPlaylistId: id });
});

Meteor.publish('playlists0', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Playlists.find({}, options);
});

Meteor.publish('allPlaylists', function() {
  return Playlists.find();
});

Meteor.publish('nowPlaying', function() {
  return NowPlaying.find({});
});

Meteor.publish('showPlaylists', function(id) {
  check(id, Number);
  return Playlists.find({ showId: id });
});

new Meteor.Pagination(Playlists);
