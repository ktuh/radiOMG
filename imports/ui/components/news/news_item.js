import './news_item.html';
import '../../../ui/components/comments/comment_item.js';
import '../../../ui/components/comments/comment_submit.js';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Posts from '../../../api/posts/posts_collection.js';
import Comments from '../../../api/comments/comments_collection.js';
import Profiles from '../../../api/users/profiles_collection.js';
import { moment } from 'meteor/momentjs:moment';

Template.newsItem.onCreated(function () {
  var self = this;
  self.autorun(function () {
    var slug = FlowRouter.getParam('slug');
    self.subscribe('singlePost', slug, {

      onReady: function() {
        var post = Posts.findOne({ slug: slug, approved: true });
        if (post === undefined) {
          FlowRouter.go('/radioblog');
        }

        self.subscribe('comments', post._id);
        self.subscribe('profileDataByUsername', post.author);
      }
    });
  });
});

Template.newsItem.helpers({
  dateFormat: (date) => moment(date).format('dddd, MMMM DD, YYYY'),
  post: () => Posts.findOne({ slug: FlowRouter.getParam('slug') }),
  comments: () => Comments.find()
});
