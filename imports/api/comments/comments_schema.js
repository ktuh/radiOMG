import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { scorpius } from 'meteor/scorpiusjs:core';

var CommentsSchema = new SimpleSchema({
  postId: {
    type: String,
    label: 'Post ID',
    optional: false
  },
  userId: {
    type: String,
    label: 'User ID',
    optional: false
  },
  author: {
    type: String,
    label: 'Author',
    optional: false
  },
  submitted: {
    type: Date,
    label: 'Timestamp',
    optional: false
  },
  body: scorpius.attribute('summernote', {
    type: String,
    label: 'Comment',
    optional: false
  })
});

export default CommentsSchema;
