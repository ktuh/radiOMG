import { Meteor } from 'meteor/meteor';
import Reviews from '../reviews_collection.js';

Meteor.publish('reviewsLimited', (options) => {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Reviews.find({ approved: true }, options);
});

Meteor.publish('approvedReviews', function() {
  return Reviews.find({ approved: true });
});

Meteor.publish('singleReview', (selector) => {
  check(selector, String);
  var reviews = Reviews.find({ slug: selector });
  if (reviews) return reviews;
  else Reviews.find({ _id: selector });
});
