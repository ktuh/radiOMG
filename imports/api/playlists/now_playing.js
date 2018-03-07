import { Mongo } from 'meteor/mongo';

export default NowPlaying = new Mongo.Collection('nowPlaying');

NowPlaying.deny({
  'insert': function() { return true; },
  'update': function() { return true; },
  'remove': function() { return true; }
});
