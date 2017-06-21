import './news_list.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Posts } from '../../../api/posts/posts_collection.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.newsList.onCreated(function () {
  var self = this;

  Session.set('chat-docid', '808mix');
  Session.set('chat-historysince', new Date(0));
  self.autorun(function() {
    var limit = FlowRouter.getParam('limit') || 8;
    self.subscribe('postsLimited', {sort: {submitted: -1}, limit: limit}, {
      onReady: function() {
        window.setTimeout(function() {
          $('.news-list').masonry('reloadItems').masonry('layout');
        }, 250);
      }
    });
    self.subscribe('chats', Session.get('chat-docid'),
                            Session.get('chat-historysince'));
  });
});

Template.newsList.onRendered(function () {
  Session.set('documentTitle', 'KTUH Honolulu | Radio For The People');
  $('.news-list').imagesLoaded(function() {
    $('.news-list').masonry({
      itemSelector: '.news-list__post',
      transitionDuration: 0,
      isResizeBound: true
    });
  });
});

Template.newsList.helpers({
  posts: () => Posts.find(),
  newsPagePath: (slug) => FlowRouter.path('news/:slug', { slug: slug }),
  excerpt: (body) => body.replace(/(([^\s]+\s\s*){100})(.*)/,"$1…")
});
