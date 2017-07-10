import { Meteor } from 'meteor/meteor';
import { Reviews } from '../reviews_collection.js';

Meteor.publish('reviewsLimited', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Reviews.find({approved: true}, options);
});

Meteor.publish('singleReview', function(selector) {
  check(selector, String);
  var reviews = Reviews.find({ slug: selector });
  if (reviews) return reviews; else return Reviews.find({_id: selector});
});

new Meteor.Pagination(Reviews);
