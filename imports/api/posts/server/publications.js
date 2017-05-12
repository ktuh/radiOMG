import { Meteor } from 'meteor/meteor';
import { Posts } from '../posts_collection.js'

Meteor.publish('posts', function (options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Posts.find({}, options);
});

Meteor.publish('singlePost', function (slug) {
  check(slug, String);
  return Posts.find({ slug: slug });
});

Meteor.publish('allPosts', function() {
  return Posts.find();
});

Meteor.publish('postsByUser', function(username) {
  check(username, String);
  return Posts.find({author: username}, {fields: {submitted: 1, title: 1, author: 1, userId: 1}});
});

Meteor.publish('chartsPosts', () => Posts.find({isChart: true}, {sort: {submitted: -1}, fields: {slug: 1, submitted: 1, title: 1}}));
