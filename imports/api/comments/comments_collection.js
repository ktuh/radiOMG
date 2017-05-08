import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { scorpius } from 'meteor/scorpiusjs:core';
import { Template } from 'meteor/templating';
import { CommentsSchema } from './comments_schema.js';

export const Comments = new scorpius.collection('comments', {
  singularName: 'comment',
  pluralName: 'comments',
  link: {
    title: 'Comments'
  },
  tabular: {
    columns: [
      {
        data: 'postId',
        title: 'Post ID',
      }, {
        data: 'author',
        title: 'Author'
      }, {
        data: 'body',
        title: 'Comment',
        tmpl: Meteor.isClient && Template.commentsIndexBlurbCell
      },
      scorpius.attributeColumn('createdAt', 'submitted', 'Timestamp')
    ]
  }
});

Comments.attachSchema(CommentsSchema);
