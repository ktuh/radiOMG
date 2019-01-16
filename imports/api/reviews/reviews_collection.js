import { scorpius } from 'meteor/scorpiusjs:core';
import ReviewsSchema from './reviews_schema';

var Reviews = new scorpius.collection('reviews', {
  singularName: 'review',
  pluralName: 'reviews',
  link: {
    title: 'Reviews'
  },
  tabular: {
    columns: [
      {
        data: 'author',
        title: 'Author'
      },
      {
        data: 'artist',
        title: 'Artist or Band'
      },
      {
        data: 'releaseName',
        title: 'Release Name'
      },
      {
        data: 'year',
        title: 'Year Released'
      },
      {
        data: 'label',
        title: 'Record Label'
      },
      {
        data: 'rating',
        title: 'Rating'
      },
      {
        data: 'image',
        title: 'Featured Image'
      },
      scorpius.attributeColumn('createdAt', 'submitted', 'Timestamp')
    ]
  }
});

Reviews.allow({
  insert: function (userId, doc) {
    return (userId && doc.userId === userId) ||
      Meteor.user().hasRole('moderator');
  },
  update: function (userId, doc) {
    return doc.userId === userId || Meteor.user().hasRole('moderator');
  },
  remove: function (userId, doc) {
    return doc.userId === userId || Meteor.user().hasRole('moderator');
  },
  fetch: ['userId']
});

Reviews.friendlySlugs({
  slugFrom: 'releaseName',
  slugField: 'slug',
  distinct: true,
  updateSlug: false
});

Reviews.attachSchema(ReviewsSchema);

export default Reviews;
