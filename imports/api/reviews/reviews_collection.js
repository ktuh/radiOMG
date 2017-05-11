import { Mongo } from 'meteor/mongo';
import { scorpius } from 'meteor/scorpiusjs:core';
import { ReviewsSchema } from './reviews_schema';
export const Reviews = new scorpius.collection('reviews', {
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
        title: "Rating"
      },
      {
        data: 'image',
        title: 'Featured Image'
      },
      scorpius.attributeColumn('createdAt', 'submitted', 'Timestamp')
    ]
  }
});

Reviews.friendlySlugs({
  slugFrom: 'releaseName',
  slugField: 'slug',
  distinct: true,
  updateSlug: false
});

Reviews.attachSchema(ReviewsSchema);
