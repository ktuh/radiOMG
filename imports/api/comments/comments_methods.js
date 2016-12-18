import { Meteor } from 'meteor/meteor';
import { createCommentNotification } from '../notifications/notifications_collection.js';

import { Parties } from '../parties/parties_collection.js';
import { Posts } from '../posts/posts_collection.js';
import { Podcasts } from '../podcasts/podcasts_collection.js';
import { Comments } from '../comments/comments_collection.js';

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String,
      type: String
    });
    var user = Meteor.user();
    var comment = {
      postId: commentAttributes.postId,
      body: commentAttributes.body,
      userId: user._id,
      author: user.username,
      submitted: new Date()
    };

    // update the post or podcast with the number of comments
    if (commentAttributes.type === "podcastPage") {
      Podcasts.update(comment.postId, {$inc: {commentCount: 1}});
    } else if (commentAttributes.type === "newsItem") {
      Posts.update(comment.postId, {$inc: {commentCount: 1}});
    } else if (commentAttributes.type === "partyPage") {
      Parties.update(comment.postId, {$inc: {commentCount: 1}});
    }
    // create the comment, save the id
    comment._id = Comments.insert(comment);
    createCommentNotification(comment);
    return comment._id;
  }
});