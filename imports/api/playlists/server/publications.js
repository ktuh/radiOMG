import { Meteor } from 'meteor/meteor';
import { Playlists } from '../playlists_collection.js';

Meteor.publish('playlist', function (id) {
  check(id, Number);
  return Playlists.find({ spinPlaylistId: id });
});
