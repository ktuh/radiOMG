import { Meteor } from 'meteor/meteor';
import { Playlists } from '../playlists_collection.js';

Meteor.publish('playlist', function (epNum) {
  check(epNum, String);
  return Playlists.find({ episodeNumber: Number(epNum) });
});
