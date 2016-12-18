import './podcast_page.html';

import { Meteor } from 'meteor/meteor';
import { Podcasts } from '../../../api/podcasts/podcasts_collection.js';
import { Playlists } from '../../../api/playlists/playlists_collection.js';
import { SEO } from '../../../api/flow-router-seo-config.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Comments } from '../../../api/comments/comments_collection.js';
import { Bert } from 'meteor/themeteorchef:bert';
import '../comments/comment_item.js';

Template.podcastPage.onCreated(function () {
  var self = this;

  self.autorun(function() {
    var epNum = FlowRouter.getParam('episodeNumber');

    self.subscribe('podcast', epNum, {
      onReady: function () {
        var podcast = Podcasts.findOne({episodeNumber: Number(epNum)});
        self.subscribe('comments', podcast._id);
        SEO.set({
          title: '808mix v.' + podcast.episodeNumber + ' mixed by ' +
                 podcast.host,
          description: 'This is volume ' + podcast.episodeNumber + ' of the ' +
                       '808mix series, mixed by ' + podcast.host + '.',
          meta: {
            'property="og:image"': podcast.coverImage,
            'name="twitter:image"': podcast.coverImage
          }
        });
      }
    });
    self.subscribe('playlist', epNum);
  });
});

Template.podcastPage.onRendered(function () {
  Session.set('documentTitle', '808mix v.' +
              FlowRouter.getParam('episodeNumber'));
});

Template.podcastPage.helpers({
  podcast: function() {
    var epNum = FlowRouter.getParam('episodeNumber');

    return Podcasts.findOne({ episodeNumber: Number(epNum) });
  },
  playlist: function() {
    var epNum = FlowRouter.getParam('episodeNumber');

    return Playlists.findOne({ episodeNumber: Number(epNum) });
  },
  comments: function() {
    return Comments.find();
  },
  isPlaying: function(mp3) {
    var isPlaying = Session.get('nowLoaded') == mp3 
                  && Session.get('paused') === false;

    return isPlaying;
  }
});

Template.podcastPage.events({
  'click .podcast-page__play-btn': function (event) {
    event.preventDefault();
    var epNum = FlowRouter.getParam('episodeNumber');
    var podcast = Podcasts.findOne({ episodeNumber: Number(epNum) });
    var nowLoaded = Session.get('nowLoaded');

    Session.set('defaultLoaded', false);
    Session.set('nowPlaying', podcast.title + ' mixed by ' + podcast.host);
    if (nowLoaded != podcast.mp3) {
      player.setSrc(podcast.mp3);
      Session.set('nowLoaded', podcast.mp3);
    }

    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  },
  'click .podcast__tag': function (event) {
    var $str = $(event.target).text().slice(1);
    var $input = $('.nav__search input');

    $input.css('font-family', 'Sweden Sans');
    $input.val($str);
    $input.keyup();
    FlowRouter.go('mix`');
  }
});
