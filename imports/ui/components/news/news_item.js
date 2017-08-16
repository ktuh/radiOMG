import './news_item.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Posts } from '../../../api/posts/posts_collection.js';
import { Comments } from '../../../api/comments/comments_collection.js';
import { Profiles } from '../../../api/users/profiles_collection.js';

Template.newsItem.onCreated(function () {
  var self = this;
  self.autorun(function () {
    var slug = FlowRouter.getParam('slug');
    self.subscribe('singlePost', slug, {
      onReady: function () {
        var post = Posts.findOne({ slug: slug });

        if (post === undefined) {
          FlowRouter.go('/news');
        }

        self.subscribe('comments', post._id);
        self.subscribe('profileDataByUsername', post.author);
      }
    });
  });
});

Template.newsItem.helpers({
  post: () => {
    var slug = FlowRouter.getParam('slug');
    var post = Posts.findOne({ slug: slug });
    return post;
  },
  comments: () => { Comments.find(); },
  displayName: () => {
    var slug = FlowRouter.getParam('slug');
    var post = Posts.findOne({ slug: slug });
    var profile = Profiles.findOne({ userId: post.userId });
    return profile && profile.name;
  }
});
