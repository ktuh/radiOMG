import { Meteor } from 'meteor/meteor';
import { Picker } from 'meteor/meteorhacks:picker';
import { RSS } from 'meteor/rss';
import { check } from 'meteor/check';
import { Shows } from '../../api/shows/shows_collection.js';
import { Playlists } from '../../api/playlists/playlists_collection.js';
import { Session } from 'meteor/session';
import { NowPlaying } from '../../api/playlists/now_playing.js';
import { HTTP } from 'meteor/http';
import bodyParser from 'body-parser';

Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({extended: false}));

Picker.route('/feed.xml', function(params, req, res, next) {
  var feed = new RSS({
    title: 'New 808 Mixes',
    description: 'The latest mixes from 808 Mixtapes, Honolulu, Hawaii.'
  });
  res.write(feed.xml());
  res.end();
});

Picker.route('/spinitron/latest', function(params, req, res, next) {
  check(params.query, {playlistId: Match.Where(function(str) {
                                                check(str, String);
                                                 return /[0-9]+/.test(str);
                                              }), showName: String});
  var show = Shows.findOne({active: true, showName: params.query.showName}) || Shows.findOne();
  var playlist = Playlists.findOne({showId: show._id, spinPlaylistId: params.query.playlistId}) || undefined;
  var today = new Date();
  var newToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
  if (!playlist) {
    Playlists.insert({spinPlaylistId: params.query.playlistId, showId: show._id, showDate: newToday});
  }

  Meteor.call('latestSong', function (e,resp) {
    if (!e) {
      if (NowPlaying.find({}).count() < 1) {
         NowPlaying.insert({current: resp});
       }
      else {
        NowPlaying.update(NowPlaying.findOne()._id, {$set: {current: resp}});
      }
    }
  });
});
