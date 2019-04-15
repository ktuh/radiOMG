import { Meteor } from 'meteor/meteor';
import Pages from '../pages_collection.js'
import { check } from 'meteor/check';

Meteor.publish('pages', function (options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Pages.find({}, options);
});

Meteor.publish('singlePage', function (slug) {
  check(slug, String);
  return Pages.find({ slug: slug });
});

Meteor.publish('allPages', function() {
  return Pages.find({});
});
