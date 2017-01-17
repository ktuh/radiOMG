import { Picker } from 'meteor/meteorhacks:picker';
import { RSS } from 'meteor/rss';
import { check } from 'meteor/check';
import { Shows } from '../../api/shows/shows_collection.js';
import { Playlists } from '../../api/playlists/playlists_collection.js';

Picker.route('/feed.xml', function(params, req, res, next) {
	var feed = new RSS({
		title: 'New 808 Mixes',
		description: 'The latest mixes from 808 Mixtapes, Honolulu, Hawaii.'
	});
	res.write(feed.xml());
	res.end();
});

Picker.route('/spinitron/latest', function(params, req, res, next) {
	check(params, {playlistId: Match.Integer, showName: String});
	var showId = Shows.findOne({active: true, showName: params.showName})._id;
	var playlist = Playlists.findOne({showId: showId, spinPlaylistId: playlistId});
	var today = new Date();
	var newToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
  if (!playlist) {
		Playlists.insert({spinPlaylistId: playlistId, showId: showId, showDate: newToday});
	}
});
