import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';
import { orion } from 'meteor/orionjs:core';

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
		max: 2016,
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
		decimal: true,
		label: 'Rating',
		optional: false
	},
	image: orion.attribute('image', {
    label: 'Featured Image',
    optional: true
  }),
	body: orion.attribute('summernote', {
    type: String,
    label: 'Body',
    optional: false
  })
});
