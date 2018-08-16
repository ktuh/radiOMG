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
      { data: 'chartDate', title: 'Chart Date' }
    ]
  }
});

Charts.friendlySlugs({
  slugFrom: ['title', 'chartDate'],
  slugField: 'slug',
  distinct: true,
  updateSlug: true,
  slugGenerator: (defaultSlug) => {
    var sec = defaultSlug.split('-').slice(-10);
    var title = defaultSlug.split('-').slice();
    var mons = ['jan','feb','mar','apr','may','jun',
      'jul','aug','sep','oct','nov','dec'];
    var mo = mons.indexOf(sec[1]) + 1;
    if (mo < 10) {
      mo = '0' + mo;
    }
    return defaultSlug.replace(sec.join('-'),
      [sec[3], mo, sec[2]].join('-'));
  }
});

Charts.attachSchema(ChartsSchema);
