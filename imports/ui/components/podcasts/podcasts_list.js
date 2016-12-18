import './podcasts_list.html';
import '../tags/tags.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Podcasts } from '../../../api/podcasts/podcasts_collection.js';
import { PodcastsIndex } from '../../../api/podcasts/podcast_index.js';
import { EasySearch } from 'meteor/easy:search';
import { $ } from 'meteor/jquery';
import './podcast_item.js';
import '../tags/tags.html';

Template.podcastsList.onRendered(function () {
  var self = this;
  var $podcasts = $('.podcasts');

  $podcasts.masonry({
  	itemSelector: '.podcast',
  	transitionDuration: 0,
  	isResizeBound: true,
  	columnWidth: '.podcast__sizer'
	});
  Session.set('documentTitle', '808mix');

  // the following corrects a bug in rerendering the masonry grid after search
  // through easysearch
  let dict = PodcastsIndex.getComponentDict();

  self.autorun(function () {
    let searching = dict.get('searching');

    //if we are not searching, run the function.
    if (!searching) {
      $podcasts.masonry('layout');
    }
  });
});

Template.podcastsList.helpers({
  podcastsIndex: () => PodcastsIndex // instanceof EasySearch.Index
});