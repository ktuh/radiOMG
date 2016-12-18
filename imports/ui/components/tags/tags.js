import './tags.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Podcasts } from '../../../api/podcasts/podcasts_collection.js';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

Template.tags.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('tags');
  });
});

Template.header.onRendered(function () {
  $(document).on('mouseenter', '.tags__tag', function() {
    Session.set('mouseIsOverTag', true);
  });
  $(document).on('mouseleave', '.tags__tag', function() {
    Session.set('mouseIsOverTag', false);
  });
  $(document).on('mouseenter', '.tags__more-tags', function() {
    Session.set('mouseIsOverTag', true);
  });
  $(document).on('mouseleave', '.tags__more-tags', function() {
    Session.set('mouseIsOverTag', false);
  });
});

Template.tags.helpers({
  tags: () => {
    var podcasts = Podcasts.find().fetch();
    var tags = [];
    var numTags = Session.get('numTags');

    _.each(podcasts, function(podcast) {
      tags = _.union(tags, podcast.tags);
    });
    return tags.length < numTags ? tags
                                 : _.first(tags, numTags);
  },
  moreTags: () => {
    var podcasts = Podcasts.find().fetch();
    var tags = [];

    _.each(podcasts, function(podcast) {
      tags = _.union(tags, podcast.tags);
    });
    return tags.length > Session.get('numTags');
  }
});

Template.tags.events({
  'click .tags__tag-btn': () => {
    Session.set('hashesOpen', !Session.get('hashesOpen'));
  },
    'click .tags__more-tags': () => {
    Session.set('numTags', Session.get('numTags') + 10);
  },
  'click .tags__tag': event => {
    var $hash = $(event.target).text().substring(1);
    var $input = $('.nav__search input');

    $input.css('font-family', 'Sweden Sans');
    $input.val($hash);
    $input.keyup();
    $('.tags').addClass('hidden');
  }
});
