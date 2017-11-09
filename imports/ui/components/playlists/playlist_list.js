import './playlist_list.html';
import { Template } from 'meteor/templating';
import Playlists from '../../../api/playlists/playlists_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { pagination } from 'meteor/kurounin:pagination';
import { moment } from 'meteor/momentjs:moment';

Template.playlistList.onCreated(function() {
  var self = this;

  self.pagination = new Meteor.Pagination(Playlists, { sort: { showDate: -1 }, perPage: 7 });
  self.autorun(function() {
    self.subscribe('activeShows', {
      onReady: function() {
        self.subscribe('playlistsLimited', { limit: 1, sort: { showDate: -1 }}, {
          onReady: function() {
            var playlist = Playlists.findOne({}, { limit: 1, sort: { showDate: -1 }});
            var show = Shows.findOne({ showId: playlist.showId });
            var showId = show && show.showId || -1;

            if (showId > -1) {
              self.subscribe('showHostUserName', id);
            }

            Meteor.call('getPlaylistOrInfo', parseInt(playlist.spinPlaylistId),
              true, function(error, result) {
              if (!error && result) {
                Session.set('currentPlaylist', result);
              }
            });
          }
        });
      }
    });
  });
});

Template.playlistList.helpers({
  latestSongs: () => Session.get("currentPlaylist"),
  img: (id) => Shows.findOne({ showId: id }).featuredImage.url,
  showName: (id) => Shows.findOne({ showId: id }).showName,
  date: (showDate) => moment(showDate).format('dddd, h:mm a,<br>MMM DD YYYY'),
  ready: () => Template.instance().pagination.ready(),
  docs: () => Template.instance().pagination.getPage(),
  tempPag: () => Template.instance().pagination,
  latestShowName: () => {
    var list = Playlists.findOne({}, { sort: { showDate: -1 }});
    var show = Shows.findOne({ showId: list.showId })
    return (show && show.showName)|| "Sub Show";
  },
  latestShowDay: function () {
    var list = Playlists.findOne({}, { sort: { showDate: -1 }});
    return moment(list.showDate).format('dddd');
  },
  latestShowStartTime: function () {
    var list = Playlists.findOne({}, { sort: { showDate: -1 }});
    return moment(list.showDate).format('h A');
  },
  latestShowSlug: () => {
    var list = Playlists.findOne({}, { sort: { showDate: -1 }});
    var show =  Shows.findOne({ showId: list.showId });
    return show && show.slug;
  },
  latestShowImage: () => {
    var list = Playlists.findOne({}, { sort: { showDate: -1 }});
    var show = Shows.findOne({ showId: list.showId });

    return (show === undefined || show.featuredImage === undefined)
           ? false : show.featuredImage.url;
  },
  latestShowHost: () => {
    var list = Playlists.findOne({}, { sort: { showDate: -1 }});
    var show = Shows.findOne({ showId: list.showId });

    if (show === undefined || show.featuredImage === undefined) {
      return list && list.djName;
    }
    else return show.host;
  },
  latestShowLink: function() {
    var list = Playlists.findOne({}, { sort: { showDate: -1 }});
    var userId = Shows.findOne({ showId: list.showId }).userId
    var user = Meteor.users.findOne({ _id: userId });
    return '/profile/' + user.username;
  },
  truncated: (str) => str.substring(0, str.length - 3),
  isSub: () =>  Playlists.findOne({}).showId === -1,
  timeHMS: (date, startTime, endTime) => {
    console.log(date);
    return moment(date).format("ddd. MMM DD, YYYY") + " " +
    moment(startTime, "HH:mm:ss").format("hh:mm") +  "-" +
    moment(endTime, "HH:mm:ss").format("hh:mm A"); } ,
  latestPlaylistStartTime: () => Playlists.findOne({}, { sort: { showDate: -1 } }).startTime,
  latestPlaylistEndTime: () => Playlists.findOne({}, { sort: { showDate: -1 } }).endTime
});
