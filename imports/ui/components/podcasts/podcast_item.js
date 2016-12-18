import './podcast_item.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Podcasts } from '../../../api/podcasts/podcasts_collection.js';
import { $ } from 'meteor/jquery';

Template.podcastItem.onCreated(function () {
  var self = this;
});

Template.podcastItem.onRendered(function () {
	var self = this;
  var $podcasts = $('.podcasts');

  $podcasts.imagesLoaded(function() {
  	$podcasts.masonry('appended', self.find('.podcast'));
    $podcasts.masonry('reloadItems').masonry('layout');
 	});
});

Template.podcastItem.onDestroyed(function () {
  var self = this;
  $('.podcasts').masonry('remove', self.find('.podcast'));
});

Template.podcastItem.helpers({
  domain: function () {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  podcastPage: function(episodeNumber) {
    var epNum = { episodeNumber: episodeNumber };
    return FlowRouter.path('podcastPage', epNum);
  },
  isPlaying: function(mp3) {
    var isPlaying = Session.get('nowLoaded') == mp3
                  && Session.get('paused') === false;
    return isPlaying;
  }
});

Template.podcastItem.events({
  'click .podcast__play-btn': function (event) {
    event.preventDefault();
    var mp3Url = $(event.currentTarget).data('path');
    var nowLoaded = Session.get('nowLoaded');
    var $overlay = $(event.currentTarget).find('.podcast__overlay');

    Session.set('defaultLoaded', false);
    if (nowLoaded != mp3Url) {
      player.setSrc(mp3Url);
      Session.set('nowLoaded', mp3Url);
    }

    if ($overlay.hasClass('hidden')) {
      return;
    }
    else if (player.paused) {
      player.play();
      event.stopImmediatePropagation();
    }
    else if (!player.paused) {
      player.pause();
      event.stopImmediatePropagation();
    }
  },
  'click .podcast__cover-img, click .podcast__overlay': function (event) {
    var $thisPodcast = $(event.target).closest('.podcast');
    var $overlay = $thisPodcast.find('.podcast__overlay');
    var $nearestOverlay = $(event.target).closest('.podcast__overlay');

    $('.podcast__overlay').not($overlay).addClass('hidden');
    $('.podcast').not($thisPodcast).removeClass('podcast__dbl-wide');

    if ($thisPodcast.hasClass('podcast__dbl-wide') && 
        $nearestOverlay.length === 0) {
      $overlay.toggleClass('hidden');
    } else {
      $thisPodcast.addClass('podcast__dbl-wide');
      $overlay.removeClass('hidden');
    }

    $('.podcasts').masonry('reloadItems').masonry('layout');
  },
  'click .podcast__tag': function (event) {
    var $str = $(event.target).text().slice(1);
    var $input = $('.nav__search input');

    $input.css('font-family', 'Sweden Sans');
    $input.val($str);
    $input.keyup();
  }
});
