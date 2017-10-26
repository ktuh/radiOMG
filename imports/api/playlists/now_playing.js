import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';

export default NowPlaying = new Mongo.Collection('nowPlaying');

NowPlaying.allow({'insert': function() { return true; }, 'update': function() { return true; }});

NowPlaying.before.insert(() => Session.set('timeout', false));
NowPlaying.before.update(() => Session.set('timeout', false));
