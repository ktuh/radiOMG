import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { orion } from 'meteor/orionjs:core';
import { Template } from 'meteor/templating';
import { CommentsSchema } from './comments_schema.js';

export const Comments = new orion.collection('comments', {
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
      orion.attributeColumn('createdAt', 'submitted', 'Timestamp')
    ]
  }
});

Comments.attachSchema(CommentsSchema);
