import { Mongo } from 'meteor/mongo';
import ShowsSchema from './shows_schema.js';
import { scorpius } from 'meteor/scorpiusjs:core';

export default Shows = new scorpius.collection('shows', {
  singularName: 'show',
  pluralName: 'shows',
  link: {
    title: 'Shows'
  },
  tabular: {
    columns: [
      {
        data: 'author',
        title: 'Author'
      },
      {
        data: 'host',
        title: 'Host'
      },
      {
        data: 'showName',
        title: 'Show Name',
      },
      {
        data: 'featuredImage',
        title: 'Featured Image',
        render: function (val, type, doc) {
          if (!val)
            return;
          return '<img src=' + val.url + '>';
        }
      },
      scorpius.attributeColumn('createdAt', 'submitted', 'Timestamp')
    ]
  }
});

Shows.friendlySlugs({
  slugFrom: 'showName',
  slugField: 'slug',
  distinct: true,
  updateSlug: false
});

Shows.attachSchema(ShowsSchema);
