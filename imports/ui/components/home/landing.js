import './landing.html';
import { Meteor } from 'meteor/meteor';
import NowPlaying from '../../../api/playlists/now_playing.js';
import Shows from '../../../api/shows/shows_collection.js';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.landing.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('showNowPlaying');
    self.subscribe('nowPlaying');
  });
});

Template.landing.helpers({
  nowPlaying: () =>  (NowPlaying.findOne() !== undefined && !Session.get('timeout')) ?
                     NowPlaying.findOne().current : false,
  formatNP: (str) => '<p class"caps">' + str.split(" - ")[1] + '</p>' +
                     '<p class="landing__show-host caps"> by </p>' +
                     '<p class="caps">' +  str.split(" - ")[0] + '</p>',
  showName: () => {
    var show = Shows.findOne({});
    return show && show.showName;
  },
  showHost: () => {
    var show = Shows.findOne({});
    return show && show.host;
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
      return 'url(\'/img/tantalus-day.jpg\')';
    }
    else if ((h >= 19 && h <= 23) || (h >= 0 && h < 6)) {
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
  }
});
