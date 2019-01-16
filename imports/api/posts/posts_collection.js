import { scorpius } from 'meteor/scorpiusjs:core';
import PostsSchema from './posts_schema.js';

var Posts = new scorpius.collection('posts', {
  singularName: 'post',
  pluralName: 'posts',
  link: {
    title: 'Posts'
  },
  tabular: {
    columns: [
      {
        data: 'author',
        title: 'Author'
      }, {
        data: 'title',
        title: 'Title',
      }, {
        data: 'approved',
        title: 'Locked'
      },
      scorpius.attributeColumn('createdAt', 'submitted', 'Timestamp')
    ]
  }
});

Posts.allow({
  insert: function (userId, doc) {
    return (userId && doc.userId === userId) ||
      Meteor.user().hasRole('moderator');
  },
  update: function (userId, doc) {
    return (userId && doc.userId === userId) ||
      Meteor.user().hasRole('moderator');
  },
  remove: function (userId, doc) {
    return (userId && doc.userId === userId) ||
      Meteor.user().hasRole('moderator');
  },
  fetch: ['userId']
});

Posts.friendlySlugs({
  slugFrom: 'title',
  slugField: 'slug',
  distinct: true,
  updateSlug: false
});

Posts.attachSchema(PostsSchema);

export default Posts;
