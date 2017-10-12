import { Meteor } from 'meteor/meteor';
import Reviews from '../reviews_collection.js';
import { publishPagination } from 'meteor/kurounin:pagination';

Meteor.publish('reviewsLimited', (options) => {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Reviews.find({ approved: true }, options);
});

Meteor.publish('singleReview', (selector) => {
  check(selector, String);
  var reviews = Reviews.find({ slug: selector });
  return reviews ? reviews : Reviews.find({ _id: selector });
});

publishPagination(Reviews);
