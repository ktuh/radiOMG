import { Mongo } from 'meteor/mongo';
import ChartsSchema from './charts_schema.js';
import { scorpius } from 'meteor/scorpiusjs:core';

export default Charts = new scorpius.collection('charts', {
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
  slugFrom: 'chartDate',
  slugField: 'slug',
  distinct: true,
  updateSlug: true,
  slugGenerator: (defaultSlug) => {
    var sec = defaultSlug.split('-');
    var mons = ["jan",'feb','mar', 'apr','may','jun','jul','aug','sep','oct','nov','dec'];
    return [sec[3], mons.indexOf(sec[1]) + 1, sec[2]].join('-');
  }
});

Charts.attachSchema(ChartsSchema);
