import ChartsSchema from './charts_schema.js';
import { scorpius } from 'meteor/scorpiusjs:core';
import { moment } from 'meteor/momentjs:moment';

var Charts = new scorpius.collection('charts', {
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
    var year = defaultSlug.split('-').filter(function(node) {
      return /20\d\d/.test(node);
    })[0];
    var yearIndex = defaultSlug.split('-').indexOf(year);
    var theDate = defaultSlug.split('-').slice(yearIndex - 2, yearIndex + 1);
    var fmt = moment(theDate, 'MMM-DD-YYYY').format('YYYY-MM-DD');
    var dow = defaultSlug.substring(
      defaultSlug.search(/sun|mon|tue|wed|thu|fri|sat/)
    );
    return defaultSlug.replace(dow, fmt);
  }
});

Charts.attachSchema(ChartsSchema);

export default Charts 
