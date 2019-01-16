import { Mongo } from 'meteor/mongo';

var NowPlaying = new Mongo.Collection('nowPlaying');

NowPlaying.deny({
  'insert': function() { return true; },
  'update': function() { return true; },
  'remove': function() { return true; }
});

export default NowPlaying;
