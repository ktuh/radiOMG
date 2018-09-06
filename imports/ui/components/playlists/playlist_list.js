import './playlist_list.html';
import './playlist_sidebar.js';
import { Template } from 'meteor/templating';
import Playlists from '../../../api/playlists/playlists_collection.js';
import Profiles from '../../../api/users/profiles_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { pagination } from 'meteor/kurounin:pagination';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';
import { currentPlaylistFindOne } from '../../../startup/lib/helpers.js';

Template.playlistList.onCreated(function() {
  var self = this;

  self.pagination = new Meteor.Pagination(Playlists, {
    sort: { showDate: -1 }, perPage: 7
  });
  self.autorun(function() {
    self.subscribe('activeShows', {
      onReady: function() {
        self.subscribe('playlistsLimited', { limit: 1, sort: { showDate: -1 } },
          {
            onReady: function() {
              self.subscribe('currentPlaylist');
              var playlist = Playlists.findOne({}, {
                limit: 1, sort: { showDate: -1 }
              });
              var show = Shows.findOne({ showId: playlist.showId });
              var showId = show && show.showId || -1;

              if (showId > -1) {
                self.subscribe('userById', show.userId);
                self.subscribe('profileData', show.userId);
              }
              else {
                self.subscribe('profileDataByUsername', playlist.djName,
                  function() {
                    self.subscribe('userByDisplayName', playlist.djName);
                  });
              }

              var parsedId = parseInt(playlist.spinPlaylistId);

              if (parsedId > 10000) {
                Meteor.call('getPlaylistOrInfo2', parsedId,
                  function(error, result) {
                    if (!error && result) {
                      Session.set('currentPlaylist', result.data.items);
                      Session.set('playlistViewing', parsedId);
                    }
                  });
              }
              else {
                Meteor.call('getPlaylistOrInfo', parsedId, true,
                  function(error, result) {
                    if (!error && result) {
                      Session.set('currentPlaylist',
                        JSON.parse(result.content).results);
                      Session.set('playlistViewing', parsedId);
                    }
                  });
              }
            }
          });
      }
    });
  });
});

Template.playlistList.helpers({
  latestSongs: () => {
    var retval = Session.get('currentPlaylist');
    retval.sort(function(a,b) {
      if (a.start > b.start) {
        return 1;
      }
      else if (a.start < b.start) {
        return -1;
      }
      else return 0;
    });
    return retval;
  },
  showById: (id) => Shows.findOne({ showId: id }),
  showTime: (startDay, startHour) => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday'];
    return days[startDay] + 's at ' +
      momentUtil().hour(startHour).format('h A');
  },
  date: (showDate) =>
    momentUtil(
      moment(showDate, 'Pacific/Honolulu')
    ).format('dddd, h:mm a,<br>MMM DD YYYY'),
  ready: () => Template.instance().pagination.ready(),
  docs: () => Template.instance().pagination.getPage(),
  tempPag: () => Template.instance().pagination,
  actualShowHost: (showId) => {
    var showName = Shows.findOne({ showId: showId }).host;
    var playlistName = Playlists.findOne({}, { sort: { showDate: -1 } }).djName;
    if (showName !== playlistName) return playlistName;
    else return showName;
  },
  isSub: (showId) => {
    var showName = Shows.findOne({ showId: showId }).host;
    var playlistName = Playlists.findOne({}, { sort: { showDate: -1 } }).djName;
    return showName !== playlistName;
  },
  latestPlaylist: () => Playlists.findOne({}, { sort: { showDate: -1 } }),
  latestShow: () => Shows.findOne({ showId: Playlists.findOne({}, {
    sort: { showDate: -1 } }).showId
  }),
  truncated: (str) =>
    /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{4}/.exec(str) === null ?
      str.substring(0, str.length - 3) : str,
  timeBeautify: (time) => {
    return momentUtil(
      moment(momentUtil(time), 'Pacific/Honolulu')
    ).format('hh:mma');
  },
  timeHMS: (date, startTime, endTime) => {
    return momentUtil(moment(date, 'Pacific/Honolulu'))
      .format('ddd. MMM DD, YYYY') + ' ' +
    momentUtil(startTime, 'HH:mm:ss')
      .format('hh:mm') +  '-' +
    momentUtil(endTime, 'HH:mm:ss')
      .format('hh:mm A'); },
  isPlaylistCurrent: () => {
    var current = currentPlaylistFindOne();
    return current !== undefined;
  }
});
