import { Picker } from 'meteor/meteorhacks:picker';
import { RSS } from 'meteor/rss';
Picker.route('/feed.xml', function(params, req, res, next) {
	var feed = new RSS({
		title: 'New 808 Mixes',
		description: 'The latest mixes from 808 Mixtapes, Honolulu, Hawaii.'
	});
	res.write(feed.xml());
	res.end();
});
