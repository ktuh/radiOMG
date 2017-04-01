import { Mongo } from 'meteor/mongo';
import { orion } from 'meteor/orionjs:core';
import { PagesSchema } from './pages_schema.js';

export const Pages = new orion.collection('pages', {
  singularName: 'page',
  pluralName: 'pages',
  link: {
    title: 'Pages'
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
        data: 'slug',
        title: 'Slug',
      },
      orion.attributeColumn('createdAt', 'submitted', 'Timestamp')
    ]
  }
});

Pages.allow({
  insert: function (userId, doc) {
    return (userId && doc.userId === userId);
  },
  update: function (userId, doc, fields, modifier) {
    return doc.userId === userId;
  },
  remove: function (userId, doc) {
    return doc.userId === userId;
  },
  fetch: ['userId']
});

Pages.friendlySlugs({
  slugFrom: 'title',
  slugField: 'slug',
  distinct: true,
  updateSlug: true
});

Pages.attachSchema(PagesSchema);
