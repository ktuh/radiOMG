import { Meteor } from 'meteor/meteor';
import { Picker } from 'meteor/meteorhacks:picker';
import { check } from 'meteor/check';
import Shows from '../../api/shows/shows_collection.js';
import Playlists from '../../api/playlists/playlists_collection.js';
import { Session } from 'meteor/session';
import NowPlaying from '../../api/playlists/now_playing.js';
import { HTTP } from 'meteor/http';
import bodyParser from 'body-parser';
import { getLocalTime } from '../lib/helpers.js';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';

Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: false }));

Picker.route('/spinitron/latest', function(params, req, res, next) {
  check(params.query, { playlistId: Match.Where(function(str) {
    check(str, String);
    return /[0-9]+/.test(str);
  }), show: Match.Where(function(str) {
    check(str, String);
    return /[0-9]+/.test(str);
  }), artist: String, song: String, dj: String });

  var showId = parseInt(params.query.show);
  var showItself = Shows.findOne({ showId: showId });
  if (!showItself) showId = -1;
  var playlistId = parseInt(params.query.playlistId);
  var html = params.query.artist + ' - ' + params.query.song;

  if (!Playlists.findOne({ showId: showId, spinPlaylistId: playlistId })) {
    if (playlistId <= 10000) {
      Meteor.call('getPlaylistOrInfo', parseInt(params.query.playlistId), false,
        function(error, result) {
          if (!error && result) {
            Playlists.insert({
              showId: showId,
              spinPlaylistId: playlistId,
              showDate: getLocalTime().toDate(),
              startTime: result.OnairTime,
              endTime: result.OffairTime,
              djName: result.DJName
            });
          }
        }
      );
    }
    else {
      Meteor.call('getPlaylistOrInfo2', parseInt(params.query.playlistId),
        function(error, result) {
          if (!error && result) {
            Playlists.insert({
              showId: showId,
              spinPlaylistId: playlistId,
              showDate: getLocalTime().toDate(),
              startTime:
                momentUtil(moment(result.data.start).tz('Pacific/Honolulu'))
                  .format('HH:mm:ss'),
              endTime:
                momentUtil(moment(result.data.end).tz('Pacific/Honolulu'))
                  .format('HH:mm:ss'),
              djName: params.query.dj
            });
          }
        });
    }
  }


  if (NowPlaying.find({}).count() < 1)
    NowPlaying.insert({
      current: html, timestamp: getLocalTime().toDate()
    });
  else
    NowPlaying.update(NowPlaying.findOne()._id, {
      $set: {
        current: html,
        timestamp: getLocalTime().toDate()
      }
    });
});
