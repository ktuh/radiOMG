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
    self.subscribe('posts', {sort: {submitted: -1}, limit: limit});
    self.subscribe('chats', Session.get('chat-docid'),
                             Session.get('chat-historysince'));
  });
});

Template.newsList.onRendered(function () {
  Session.set('documentTitle', '808news');
});

Template.newsList.helpers({
  posts: function () {
    return Posts.find();
  },
  newsPagePath: function (slug) {
    var params = { slug: slug };

    return FlowRouter.path('news/:slug', params);
  }
});
