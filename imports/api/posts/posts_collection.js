import { Mongo } from 'meteor/mongo';
import { orion } from 'meteor/orionjs:core';
import { PostsSchema } from './posts_schema.js';

export const Posts = new orion.collection('posts', {
  singularName: 'post',
  pluralName: 'posts',
  link: {
    title: 'Posts'
  },
  tabular: {
    columns: [
      {
        data: 'userId',
        title: 'User ID'
      }, {
        data: 'author',
        title: 'Author'
      }, {
        data: 'title',
        title: 'Title',
      }, {
        data: 'body',
        title: 'Body',
        tmpl: Meteor.isClient && Template.commentsIndexBlurbCell
      },
      orion.attributeColumn('createdAt', 'submitted', 'Timestamp')
    ]
  }
});

Posts.friendlySlugs({
	slugFrom: 'title',
	slugField: 'slug',
	distinct: true,
	updateSlug: false
});

Posts.attachSchema(PostsSchema);
