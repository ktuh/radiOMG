import './header.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { EasySearch } from 'meteor/easy:search';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { NowPlaying } from '../../../api/playlists/now_playing.js';
import 'mediaelement/player';

// Template.header.onCreated(function () {
//   var self = this;

//   self.subscribe("nowPlaying");
//   if (NowPlaying.find({}).count() < 1) {
//     Meteor.call("latestSong", function (e, r) {
//       if (!e) {
//         NowPlaying.insert({current: r});
//       }
//     });
//   }
// });

Template.header.onRendered(function () {
  var $searchInput = $('.nav__search input');

  Session.set('nowPlaying', 'Live audio stream.');
  // $('#audio-player').mediaelementplayer({
  //   pluginPath: "../../../../node_modiules/medaelement/build",
  //   alwaysShowControls: true,
  //   features: ['playpause', 'progress'],
  //   type: 'audio/mp3',
  //   audioWidth: 200,
  //   audioHeight: 20,
  //   iPadUseNativeControls: false,
  //   iPhoneUseNativeControls: false,
  //   AndroidUseNativeControls: false,
  //   success: function (mediaElement, domObject) {
  //     mediaElement.addEventListener('play', function(e) {
  //       Session.set('paused', false);
  //     }, false);
  //     mediaElement.addEventListener('pause', function(e) {
  //       Session.set('paused', true);
  //     }, false);
  //     // Display what's playing if user clicks the player without loading
  //     // another song first.
  //     $('.mejs__playpause-button').click(function () {
  //       if (Session.equals('defaultLoaded', true)) {
  //         var message = 'Now playing the ' +
  //             orion.dictionary.get('mainPage.title', 'station\'s') + ' live stream';
  //         Session.set('defaultLoaded', false);
  //         Session.set('nowLoaded', orion.dictionary.get('mainPage.audioUrl', ''));
  //         Bert.alert(message, 'default', 'growl-top-right', 'fa-music');
  //       }
  //     });
  //     player = mediaElement; // make it available for other functions
  //   },
  //   error: function () {
  //     console.error("Encountered an error while initializing the media element.")
  //   }
  // });
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
  showPage: () => FlowRouter.path('show'),
  reviewsPage: () => FlowRouter.path('reviewsPage'),
  nowPlaying: () => Session.get('nowPlaying'),
  // latestSong: () =>  NowPlaying.findOne().current
});

Template.header.events({
  'click .glyphicon-search': function (event) {
    $('.nav__search input').focus();
  }
});
