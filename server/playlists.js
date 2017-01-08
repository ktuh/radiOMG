import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import CryptoJS from 'crypto-js';
import '/node_modules/crypto-js/enc-base64.js';
import moment from 'moment-timezone';
import { check } from 'meteor/check';

Meteor.methods({
	getPlaylist: function(id) {
		console.log(id);
		check(id, Number);
		var date = new Date();

		var ts = moment(date).tz("Etc/UTC");

		var params = {
			method: 'getSongs',
			station: Meteor.settings.spinitronStation,
			papiversion: Meteor.settings.spinitronPapiVersion,
			papiuser: Meteor.settings.spinitronUserId,
			timestamp: ts.format(),
			PlaylistID: id
		};

		// Sort list of pairs by key
		var keys = Object.keys(params);
		keys.sort(function(a,b) {
			return a.localeCompare(b);
		});

		var query = [];

		for (var k = 0; k < keys.length; k++) {
			query.push(encodeURIComponent(keys[k]) + '=' + encodeURIComponent(params[keys[k]]));
		}
		console.log(query);
		query = query.join("&");
		console.log(query);
		var subject = "spinitron.com\n/public/spinpapi.php\n" + query;

	  var sig = CryptoJS.HmacSHA256(subject, Meteor.settings.spinitronSecret);

		sig = sig.toString(CryptoJS.enc.Base64);
		console.log(sig);
//		sig = sig.replace(/=/g, '');
		sig = encodeURIComponent(sig);

		params.signature = sig;
		var q_sig = encodeURIComponent("signature") + "=" + sig;
		query = query + "&" + q_sig;
		console.log(query);

		return HTTP.get("http://spinitron.com/public/spinpapi.php", {
			query: query
		}, function(error, result) {
			if (!error) {
				return JSON.parse(result.content).results;
			}
			else console.error(error);
		});
	}
});
