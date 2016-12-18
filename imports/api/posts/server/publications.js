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
