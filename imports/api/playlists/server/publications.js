import { Meteor } from 'meteor/meteor';
import { Playlists } from '../playlists_collection.js';
import { HTTP } from 'meteor/http';
import { Random } from 'meteor/random';
import { NowPlaying } from '../now_playing.js';

Meteor.publish('playlist', function (id) {
  check(id, Number);
  return Playlists.find({ spinPlaylistId: id });
});

Meteor.publish('nowPlaying', function() {
	var self = this;
	try {
     var resp = HTTP.get('http://spinitron.com/radio/newestsong.php', {params: {station: Meteor.settings.spinitronStation, num: 1}});
		 self.added("nowPlaying", Random.id(), {content: resp.content});
		 self.ready();
	} catch (error) {
		console.error(error);
	}
});
