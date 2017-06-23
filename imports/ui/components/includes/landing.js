import './landing.html';
import { Meteor } from 'meteor/meteor';
import { NowPlaying } from '../../../api/playlists/now_playing.js';
import { Shows } from '../../../api/shows/shows_collection.js';
import { Template } from 'meteor/templating';

Template.landing.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('showNowPlaying');
  });
});

Template.landing.helpers({
  nowPlaying: () =>  (NowPlaying.findOne() !== undefined) /*&& !Session.get('timeout')) */ ?
                     NowPlaying.findOne().current : false,
  formatNP: (str) => '<p>' + str.split(" - ")[1] + '</p>' +
                     '<p class="lading__show-host"> by </p>' +
                     '<p>' +  str.split(" - ")[0] + '</p>',
  showName: () => {
    var show = Shows.findOne();
    return show && show.showName;
  },
  showHost: () => {
    var show = Shows.findOne();
    return show && show.host;
  },
  isPlaying: () => {
    return Session.get('nowLoaded') === scorpius.dictionary.get('mainPage.audioUrl', '')
           && Session.get('paused') === false;
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
