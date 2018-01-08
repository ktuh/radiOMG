import './landing.html';
import { Meteor } from 'meteor/meteor';
import NowPlaying from '../../../api/playlists/now_playing.js';
import Shows from '../../../api/shows/shows_collection.js';
import Playlists from '../../../api/playlists/playlists_collection.js';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { moment } from 'meteor/momentjs:moment';

Template.landing.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('showNowPlaying', {
      onReady: function() {
        var show = Shows.findOne({});
        if (show) self.subscribe('userById', show.userId);
      }
    });
    self.subscribe('nowPlaying');
    if (NowPlaying.findOne()) {
      Session.set('timeout', moment().diff(moment(NowPlaying.findOne().timestamp)) > 360000);
    }
    self.subscribe('currentPlaylist');
  });
});

var currentPlaylist = function() {
   return Playlists.findOne({
    $where: function() {
      return this.showDate.getYear() === new Date().getYear() &&
             this.showDate.getMonth() === new Date().getMonth() &&
             this.showDate.getDate() === new Date().getDate() &&
             parseInt(this.startTime.split(":")[0]) <= new Date().getHours() &&
             (parseInt(this.endTime.split(":")[0]) > new Date().getHours() ||
             this.endTime === "00:00:00");
    }
  }
)};

Template.landing.helpers({
  nowPlaying: () =>  (NowPlaying.findOne() !== undefined && !Session.get('timeout')) ?
                     NowPlaying.findOne().current : false,
  formatNP: (str) => '<p class="landing__song-title caps">' + str.split(" - ")[1] + '</p>' +
                     '<p class="landing__song-artist caps"> by ' +  str.split(" - ")[0] + '</p>',
  showName: () => {
    var now =  new Date();
    var show = Shows.findOne({active: true, startDay: now.getDay(),
                              startHour: { $lte: now.getHours() }, endDay: now.getDay(),
                              endHour: { $gt: now.getHours() } });
    return show && show.showName;
  },
  hostUsername: () => Meteor.users.findOne({}).username,
  showSlug: () => {
    var now =  new Date();
    var show = Shows.findOne({active: true, startDay: now.getDay(),
                              startHour: { $lte: now.getHours() }, endDay: now.getDay(),
                              endHour: { $gt: now.getHours() } });
    return show && show.slug;
  },
  isSubShow: () => {
    var now =  new Date();
    var show = Shows.findOne({active: true, startDay: now.getDay(),
                              startHour: { $lte: now.getHours() }, endDay: now.getDay(),
                              endHour: { $gt: now.getHours() } });
    var playlist = currentPlaylist();
    if (show && playlist) {
      return show.host === playlist.djName;
    }
  },
  showHost: () => {
    var now =  new Date();
    var show = Shows.findOne({active: true, startDay: now.getDay(),
                              startHour: { $lte: now.getHours() }, endDay: now.getDay(),
                              endHour: { $gt: now.getHours() } });
    var playlist = currentPlaylist();
    if (show && playlist) {
      if (show.host === playlist.djName) {
        return show.host;
      }
      else if (show.host !== playlist.djName) {
        return playlist.djName;
      }
    }
    else if (show && !playlist) {
      return show.host;
    }
    else if (playlist && !show) {
      return playlist.djName;
    }
    else return undefined;
  },
  isPlaying: () => {
    return Session.get('nowLoaded') === scorpius.dictionary.get('mainPage.audioUrl', '')
           && Session.get('paused') === false;
  },
  background: () => {
    var h = new Date().getHours();
    var $landing = $('.landing');

    if (h >= 6 && h < 11) {
      return 'url(\'/img/tantalus-morning.jpg\')';
    }
    else if (h >= 11 && h < 18) {
      return 'url(\'/img/tantalus-morning.jpg\')';
    }
    else if ((h >= 18 && h <= 23) || (h >= 0 && h < 6)) {
      return 'url(\'/img/tantalus-evening.jpg\')';
    }
  }
});

Template.landing.events({
  'click .landing__play-btn-outer': function(event) {
    var url = scorpius.dictionary.get('mainPage.audioUrl', '');

    if (Session.get('paused') === false)
      player.pause();
    else if (Session.get(url))
      player.play();
    else {
      player.setSrc(url);
      Session.set('nowLoaded', url);
      player.play();
    }
  },
  'click .landing__down-arrow': function(event) {
    var position = $("#main").offset().top;
    var navHeight = $('.navbar-header').height();
    $("HTML, BODY").animate({ scrollTop: position - navHeight + 2 }, 600);
  }
});
