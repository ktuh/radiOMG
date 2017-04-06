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

Picker.route('/spinitron/latest', function(params, req, res, next) {
  console.log(params.query);
  check(params.query, {playlistId: Match.Where(function(str) {
                                                check(str, String);
                                                 return /[0-9]+/.test(str);
                                              }), show: Match.Where(function(str) {
                                                check(str, String);
                                                return /[0-9]+/.test(str);
                                            })});

  var showId = Number.parseInt(params.query.show);
  var showItself = Shows.find({showId: showId});
  if (showItself) {
    if (!Playlists.findOne({showId: showId, spinPlaylistId: Number.parseInt(params.query.playlistId)}))
      Playlists.insert({showId: showId, spinPlaylistId: Number.parseInt(params.query.playlistId), showDate: new Date()});
  }

  Meteor.call('latestSong', function (e, resp) {
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
