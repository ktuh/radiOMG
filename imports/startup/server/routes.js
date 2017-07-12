import { Meteor } from 'meteor/meteor';
import { Picker } from 'meteor/meteorhacks:picker';
import { check } from 'meteor/check';
import { Shows } from '../../api/shows/shows_collection.js';
import { Playlists } from '../../api/playlists/playlists_collection.js';
import { Session } from 'meteor/session';
import { NowPlaying } from '../../api/playlists/now_playing.js';
import { HTTP } from 'meteor/http';
import bodyParser from 'body-parser';

Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: false }));

Picker.route('/spinitron/latest', function(params, req, res, next) {
  check(params.query, { playlistId: Match.Where(function(str) {
                                                check(str, String);
                                                 return /[0-9]+/.test(str);
                                              }), show: Match.Where(function(str) {
                                                check(str, String);
                                                return /[0-9]+/.test(str);
                                            }), artist: String, song: String});

  var showId = Number.parseInt(params.query.show);
  var showItself = Shows.find({ showId: showId });
  var playlistId = Number.parseInt(params.query.playlistId);
  var html = params.query.artist + " - " + params.query.song;

  if (showItself && !Playlists.findOne({ showId: showId, spinPlaylistId: playlistId }))
      Playlists.insert({ showId: showId, spinPlaylistId: playlistId, showDate: new Date() });

  if (NowPlaying.find({}).count() < 1)
     NowPlaying.insert({current: html, timestamp: new Date()});
  else
    NowPlaying.update(NowPlaying.findOne()._id, { $set: { current: html, timestamp: new Date() }});
});
