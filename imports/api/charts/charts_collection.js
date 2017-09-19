import { Mongo } from 'meteor/mongo';
import { ChartsSchema } from './charts_schema.js';
import { scorpius } from 'meteor/scorpiusjs:core';

export const Charts = new scorpius.collection('charts', {
  singularName: 'chart',
  pluralName: 'charts',
  link: {
    title: 'Charts'
  },
  tabular: {
    columns: [
      { data: 'title', title: 'Title' },
      { data: 'createdAt', title: 'Created At' },
      { data: 'createdBy', title: 'Created By' },
      { data: 'editedAt', title: 'Edited At' },
      { data: 'editedBy', title: 'Edited By' },
      scorpius.attributeColumn('createdAt', 'editedAt', 'Timestamp')
    ]
  }
});

Charts.friendlySlugs({
  slugFrom: 'title',
  slugField: 'slug',
  distinct: true,
  updateSlug: false
});

Charts.attachSchema(ChartsSchema);
