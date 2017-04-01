import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { orion } from 'meteor/orionjs:core';
import { Meteor } from 'meteor/meteor';

export const ShowsSchema = new SimpleSchema({
  showName: {
    type: String,
    label: "Show Name",
    optional: false
  },
  showId: {
    type: Number,
    label: "Spinitron Show ID"
  },
  userId: {
    type: String,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: function() {
      if (!this.isSet) return this.userId;
    }
  },
  author: {
    type: String,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: function() {
      if (!this.isSet) return Meteor.user().username;
    }
  },
  host: {
    type: String,
    optional: false
  },
  startDay: {
    type: String,
    label: "Start Day",
    allowedValues: ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday'],
    autoform: {
      options: [
        {label: "Sunday", value: 'Sunday'},
        {label: "Monday", value: 'Monday'},
        {label: "Tuesday", value: 'Tuesday'},
        {label: "Wednesday", value: 'Wednesday'},
        {label: "Thursday", value: 'Thursday'},
        {label: "Friday", value: 'Friday'},
        {label: "Saturday", value: 'Saturday'}
      ]
    },
    optional: false
  },
  startHour: {
    type: Number,
    label: "Start Hour",
    min: 0,
    max: 23
  },
  startMinute: {
    type: Number,
    label: "Start Minute",
    min: 0,
    max: 59
  },
  endDay: {
    type: String,
    label: "Start Day",
    allowedValues: ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday'],
    autoform: {
      options: [
        {label: "Sunday", value: 'Sunday'},
        {label: "Monday", value: 'Monday'},
        {label: "Tuesday", value: 'Tuesday'},
        {label: "Wednesday", value: 'Wednesday'},
        {label: "Thursday", value: 'Thursday'},
        {label: "Friday", value: 'Friday'},
        {label: "Saturday", value: 'Saturday'}
      ]
    },
    optional: false
  },
  endHour: {
    type: Number,
    label: "End Hour",
    min: 0,
    max: 23
  },
  endMinute: {
    type: Number,
    label: "End Minute",
    min: 0,
    max: 59
  },
  genres: {
    type: [String],
    optional: false
  },
  body: orion.attribute('summernote', {
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
  featuredImage: orion.attribute('image', {
    label: 'Featured Image',
    optional: true
  }),
  submitted: {
    type: Date,
    autoform: {
      type: 'hidden',
      label: false
    },
    defaultValue: new Date()
  }
});
