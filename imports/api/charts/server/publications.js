import { Meteor } from 'meteor/meteor';
import Charts from '../charts_collection.js';
import { publishPagination } from 'meteor/kurounin:pagination';

Meteor.publish('chartsLimited', (options) => {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Charts.find({ }, options);
});

Meteor.publish('singleChart', (slug) => {
  check(slug, String);
  return Charts.find({ slug: slug });
});

publishPagination(Charts);
