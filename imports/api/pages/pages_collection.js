import { scorpius } from 'meteor/scorpiusjs:core';
import PagesSchema from './pages_schema.js';

var Pages = new scorpius.collection('pages', {
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
      scorpius.attributeColumn('createdAt', 'submitted', 'Timestamp')
    ]
  }
});

Pages.allow({
  insert: function (userId, doc) {
    return (userId && doc.userId === userId);
  },
  update: function (userId, doc) {
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

export default Pages;
