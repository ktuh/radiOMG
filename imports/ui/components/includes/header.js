import './header.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { EasySearch } from 'meteor/easy:search';
import { Podcasts } from '../../../api/podcasts/podcasts_collection.js';
import { PodcastsIndex } from '../../../api/podcasts/podcast_index.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery';

Template.header.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('latestPodcast', function() {
      var latest = Podcasts.findOne({}, { sort: {episodeNumber: -1} });
      $('#audio-player').attr('src', latest.mp3);
      Session.set('nowPlaying', latest.title + ' mixed by ' + latest.host);
    });
  });
});

Template.header.onRendered(function () {
  var $searchInput = $('.nav__search input');

  $('#audio-player').mediaelementplayer({
    alwaysShowControls: true,
    features: ['playpause', 'progress'],
    audioVolume: 'horizontal',
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
      // Display what's playing if user clicks the player without loading
      // another song first.
      $('.mejs-playpause-button').click(function () {
        if (Session.equals('defaultLoaded', true)) {
          var latest = Podcasts.findOne({}, { sort: {episodeNumber: -1} });
          var message = 'Now playing ' + latest.title + ', mixed by '
                                                   + latest.host + '.';

          Session.set('defaultLoaded', false);
          Session.set('nowLoaded', latest.mp3);
          Bert.alert(message, 'default', 'growl-top-right', 'fa-music');
        }
      });
      player = mediaElement; // make it available for other functions
    },
    error: function () {
      console.log("Encountered an error while initializing the media element.")
    }
  });
  var mp3 = $('#audio-player').attr('src');

  Session.set('nowLoaded', mp3);
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
});

Template.header.helpers({
  newsPage: () => FlowRouter.path('news'),
  partyPage: () => FlowRouter.path('party'),
	reviewsPage: () => FlowRouter.path('reviewsPage'),
  latest: () => Podcasts.findOne(),
  podcastsIndex: () => PodcastsIndex, // instanceof EasySearch.Index
  nowPlaying: () => Session.get('nowPlaying')
});

Template.header.events({
  'click .glyphicon-search': function (event) {
    $('.nav__search input').focus();
  }
});
