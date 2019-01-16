import { Meteor } from 'meteor/meteor';
import Comments from '../comments_collection.js';
import { check } from 'meteor/check';

Meteor.publish('comments', function(postId) {
  check(postId, String);
  return Comments.find({ postId: postId });
});

Meteor.publish('commentsIndex', function () {
  return Comments.find({ sort: { submitted: -1, _id: -1 }, limit: 0 });
});
