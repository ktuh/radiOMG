import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { scorpius } from 'meteor/scorpiusjs:core';
import { Meteor } from 'meteor/meteor';
import Profiles from '../users/profiles_collection.js';
import { thumbnailUrl, getLocalTime } from '../../startup/lib/helpers.js';

var ShowsSchema = new SimpleSchema({
  showName: {
    type: String,
    label: 'Show Name',
    optional: false
  },
  showId: {
    type: Number,
    label: 'Spinitron Show ID'
  },
  userId: {
    type: String,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: function() {
      if (this.isUpdate)
        return this.value;
      else
        return Meteor.userId();
    }
  },
  author: {
    type: String,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: function() {
      if (this.isUpdate)
        return this.value;
      else
        return Meteor.user().username;
    }
  },
  host: {
    type: String,
    optional: false,
    autoValue: function() {
      if (this.isUpdate)
        return this.value;
      else
        return Profiles.find({ userId: Meteor.userId() }).name;
    }
  },
  startDay: {
    type: Number,
    label: 'Start Day',
    allowedValues: [0, 1, 2, 3, 4, 5, 6],
    autoform: {
      options: [
        { label: 'Sunday', value: 0 },
        { label: 'Monday', value: 1 },
        { label: 'Tuesday', value: 2 },
        { label: 'Wednesday', value: 3 },
        { label: 'Thursday', value: 4 },
        { label: 'Friday', value: 5 },
        { label: 'Saturday', value: 6 }
      ]
    },
    optional: false
  },
  startHour: {
    type: Number,
    label: 'Start Hour',
    min: 0,
    max: 23
  },
  startMinute: {
    type: Number,
    label: 'Start Minute',
    min: 0,
    max: 59
  },
  endDay: {
    type: Number,
    label: 'End Day',
    allowedValues: [0, 1, 2, 3, 4, 5, 6],
    autoform: {
      options: [
        { label: 'Sunday', value: 0 },
        { label: 'Monday', value: 1 },
        { label: 'Tuesday', value: 2 },
        { label: 'Wednesday', value: 3 },
        { label: 'Thursday', value: 4 },
        { label: 'Friday', value: 5 },
        { label: 'Saturday', value: 6 }
      ]
    },
    optional: false
  },
  endHour: {
    type: Number,
    label: 'End Hour',
    min: 0,
    max: 23
  },
  endMinute: {
    type: Number,
    label: 'End Minute',
    min: 0,
    max: 59
  },
  genres: {
    type: [String],
    optional: false,
    maxCount: 3
  },
  synopsis: {
    type: String,
    label: 'Synopsis (short description of show)',
    optional: false,
    min: 50,
    max: 240,
  },
  body: scorpius.attribute('summernote', {
    type: String,
    label: 'Body',
    optional: false
  }),
  slug: {
    type: String,
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  active: {
    type: Boolean,
    optional: false
  },
  commentCount: {
    type: Number,
    label: 'Comment Count',
    defaultValue: 0
  },
  featuredImage: scorpius.attribute('image', {
    label: 'Featured Image',
    optional: true
  }),
  thumbnail: {
    type: String,
    optional: true,
    autoValue: function() {
      var url = this.siblingField('featuredImage.url').value;
      if (url) return thumbnailUrl(url, 520);
    }
  },
  latestEpisodeUrl: {
    type: String,
    label: 'Link to Latest Episode',
    optional: true
  },
  submitted: {
    type: Date,
    autoform: {
      type: 'hidden',
      label: false
    },
    defaultValue: () => getLocalTime().toDate()
  }
});

export default ShowsSchema;
