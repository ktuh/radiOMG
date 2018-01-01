import './show_page.html';
import Shows from '../../../api/shows/shows_collection.js';
import Playlists from '../../../api/playlists/playlists_collection.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { moment } from 'meteor/momentjs:moment';

Template.showPage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var slug = FlowRouter.getParam('slug');
    self.subscribe('singleShow', slug, {
      onReady: function() {
        var show = Shows.findOne({ slug: slug });
        if (show) {
          Session.set('documentTitle', show.showName);
          self.subscribe('comments', show._id);
          self.subscribe('showHostUserName', show.userId);
          self.subscribe('showPlaylists', show.showId, {
            onReady: function() {
              var latest = Playlists.findOne({}, {sort: {showDate: -1}});
              if (latest !== undefined) {
                Meteor.call('getPlaylistOrInfo', parseInt(latest.spinPlaylistId),
                  true, function(error, result) {
                  if (!error && result)
                    Session.set('currentPlaylist', result);
                });
              }
            }
          });
        }
      }
    });
  });
});

Template.showPage.helpers({
  show: () =>  Shows.findOne({ slug: FlowRouter.getParam('slug')}),
  lessThanTen: (n) => Math.abs(n) < 10,
  time: (t) => moment(t).format('ddd. MMM. D, YYYY'),
  playlists: () => Playlists.find({}, { sort: { showDate: -1 } }),
  latestPlaylist: () => Playlists.findOne({}, { sort: { showDate: -1 } }),
  pastPlaylists: () => Playlists.find({}, { sort: { showDate: -1 }, skip: 1}),
  playlistsByYear: () => {
    var playlistDates = Playlists.find({}, {sort: {showDate: -1}, skip: 1}).fetch();
    var uniqDates = _.uniq(_.map(_.pluck(playlistDates, "showDate"), (obj) => obj.getFullYear()), true, (date) => +date);
    var a = [];
    for (var p = 0; p < uniqDates.length; p++) {
      var r = {};
      r.year = uniqDates[p];
      r.shows = _.filter(playlistDates, (obj) => obj.showDate.getFullYear() === uniqDates[p]);
      a.push(r);
    }
    return a;
  },
  slug: () => FlowRouter.getParam('slug'),
  profileUrl: function(id) {
    var user = Meteor.users.findOne({ _id: id });
    return '/profile/' + user.username;
  },
  isPlaying: (mp3) => Session.get('nowLoaded') == mp3 &&
                      Session.get('paused') === false,
  day: function(num) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[num];
  },
  timeBeautify: (startHour, startMinute, endHour, endMinute) => {
    if (startMinute === 1) {
      startMinute--;
    }
    if (endMinute === 59) {
      endHour = (endHour + 1) % 24;
      endMinute = 0;
    }
    return moment(startHour + ":" + startMinute, "HH:mm").format(startHour > endHour ? "h:mmA" : "h:mm") + "-" +
    moment(endHour + ":" + endMinute, "HH:mm").format("h:mmA");
  },
  timeBeautify2: (h, m) => moment(h + ":" + m, "HH:mm").format("h:mma"),
  genreString: (genres) => genres.join(', '),
  actualPlaylist: () => Session.get("currentPlaylist")
});

Template.showPage.events({
  'click .show__play-btn': function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    var mp3Url = $(event.currentTarget).data('path');
    var nowLoaded = Session.get('nowLoaded');

    if (nowLoaded != mp3Url) {
      var show = Shows.findOne({ slug: FlowRouter.getParam('slug') });
      $('.mejs__time-slider').css('visibility', 'visible');
      $('.mejs__broadcast').css('visibility', 'hidden');
      player.setSrc(mp3Url);
      var message = 'Now playing the latest episode of ' + show.showName;
      Session.set('defaultLoaded', false);
      Session.set('nowLoaded', mp3Url);
      if (!Session.get('playedStream')) Session.set('playedStream', true);
      Bert.alert(message, 'default', 'growl-top-right', 'fa-music');
    }

    if (player.paused) {
      player.play();
    }
    else if (!player.paused) {
      player.pause();
    }
  },
  'change select': function(evt) {
    FlowRouter.go('/playlists/' + $(evt.target).val());
  },
  'click .goto-dj-profile': function(evt) {
    var id = Shows.findOne({ slug: FlowRouter.getParam('slug') }).userId;
    var user = Meteor.users.findOne({ _id: id });
    FlowRouter.go('/profile/' + user.username);
  }
});
