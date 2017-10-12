import { Mongo } from 'meteor/mongo';

export default NowPlaying = new Mongo.Collection('nowPlaying');

NowPlaying.allow({'insert': function() { return true; }, 'update': function() { return true; }});
