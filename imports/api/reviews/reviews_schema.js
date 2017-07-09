import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';
import { scorpius } from 'meteor/scorpiusjs:core';

export const ReviewsSchema = new SimpleSchema({
  userId: {
    type: String,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: function () {
      if (!this.isSet)
        return this.userId;
    }
  },
  author: {
    type: String,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: function() {
      if (!this.isSet)
        return Meteor.user().username;
    }
  },
  slug: {
    type: String,
    autoform: {
      type: 'hidden',
      label: false
    },
    optional: false
  },
  submitted: {
    type: Date,
    autoform: {
      type: 'hidden',
      label: false
    },
    defaultValue: new Date()
  },
  artist: {
    type: String,
    label: 'Artist Or Band',
    optional: false
  },
  releaseName: {
    type: String,
    label: 'Release Name',
    optional: false
  },
  year: {
    type: Number,
    min: 0,
    max: 2017,
    label: 'Year Released',
    optional: false
  },
  label: {
    type: String,
    label: 'Record Label',
    optional: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    allowedValues: [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
    decimal: true,
    label: 'Rating (0-5 in increments of .5)',
    optional: false
  },
  image: scorpius.attribute('image', {
    label: 'Featured Image',
    optional: true
  }),
  body: scorpius.attribute('summernote', {
    type: String,
    label: 'Body',
    optional: false
  }),
  approved: {
    type: Boolean,
    optional: true,
    defaultValue: false,
    label: 'Approved'
  }
});
