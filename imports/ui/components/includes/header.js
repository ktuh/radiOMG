import './header.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import NowPlaying from '../../../api/playlists/now_playing.js';
import { moment } from 'meteor/momentjs:moment';
import 'mediaelement/player';

Template.header.onCreated(function () {
  var self = this;
  self.subscribe('nowPlaying');
});

Template.header.onRendered(function () {
  var $searchInput = $('.nav__search input');
  var mp3 = $('#audio-player').attr('src');

  Session.set('nowLoaded', mp3);
  Session.set('nowPlaying', 'Live audio stream.');
  $searchInput.css('font-family', 'Glyphicons Halflings');
  $searchInput.attr('placeholder', '\ue003');
  $searchInput.focusin(function () {
    if (FlowRouter.getRouteName() != 'mix')
      FlowRouter.go('mix');
    $searchInput.css('font-family', 'Sweden Sans');
    $searchInput.attr('placeholder', 'Search DJ, genre, etc.');
    $('.tags').removeClass('hidden');
  });
  $searchInput.focusout(function() {
    if ($searchInput.val().length === 0) {
      $searchInput.css('font-family', 'Glyphicons Halflings');
      $searchInput.attr('placeholder', '\ue003');
    }
    if (!Session.get('mouseIsOverTag')) {
      $('.tags').addClass('hidden');
    }
  });

  // This timeout kludge is necessary because the onRendered callback fires before
  // some of the DOM is fully rendered.
  setTimeout(function() {
    $('#audio-player').mediaelementplayer({
      pluginPath: '/mejs/',
      alwaysShowControls: true,
      features: ['playpause', 'progress'],
      type: 'audio/mp3',
      src: 'http://stream.ktuh.org:8000/stream-mp3',
      audioWidth: 200,
      audioHeight: 20,
      iPadUseNativeControls: false,
      iPhoneUseNativeControls: false,
      AndroidUseNativeControls: false,
      success: function (mediaElement, domObject) {
        mediaElement.addEventListener('play', function(e) {
          Session.set('paused', false);
        }, false);
        mediaElement.addEventListener('pause', function(e) {
          Session.set('paused', true);
        }, false);

        $('.mejs__time-rail').append('<span class="mejs__broadcast">Live ' +
        'Broadcast</span>');
        $('.mejs__time-slider').css('visibility', 'hidden');
        // Display what's playing if user clicks the player without loading
        // another song first.
        $('.mejs__playpause-button').click(function () {
          if (Session.equals('defaultLoaded', true)) {
            var message = 'Now playing the ' +
                scorpius.dictionary.get('mainPage.title', 'station\'s') + ' live stream';
            Session.set('defaultLoaded', false);
            Session.set('nowLoaded', scorpius.dictionary.get('mainPage.audioUrl', ''));
            if (!Session.get('playedStream')) {
              Bert.alert(message, 'default', 'growl-top-right', 'fa-music');
              Session.set('playedStream', true);
            }
          }
        });
        player = mediaElement; // make it available for other functions
      },
      error: function () {
        console.error('Encountered an error while initializing the media element.')
      }
    });
  }, 1000);

  setInterval(function() {
    if (NowPlaying.findOne()) {
      if (moment().diff(moment(NowPlaying.findOne().timestamp)) > 360000 && !Session.get('timeout')) {
        Session.set('timeout', true);
      }
      else if (moment().diff(moment(NowPlaying.findOne().timestamp)) <= 360000 && Session.get('timeout')) {
        Session.set('timeout', false);
      }
    }
  }, 60000);
});

Template.header.helpers({
  musicPage: () => FlowRouter.path('music'),
  newsPage: () => FlowRouter.path('radioblog'),
  partyPage: () => FlowRouter.path('party'),
  showPage: () => FlowRouter.path('show'),
  reviewsPage: () => FlowRouter.path('reviewsPage'),
  nowPlaying: () => Session.get('nowPlaying'),
  latestSong: () =>  (NowPlaying.findOne() !== undefined && !Session.get('timeout')) ?
                     '<div>Last Played Song: ' + NowPlaying.findOne().current + '</div>' : ''
});

Template.header.events({
  'click .glyphicon-search': function(event) {
    $('.nav__search input').focus();
  }
});
