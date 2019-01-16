import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import TracksSchema from './tracks_schema.js';
import { Meteor } from 'meteor/meteor';
import { getLocalTime } from '../../startup/lib/helpers.js';
import { scorpius } from 'meteor/scorpiusjs:core';

var ChartsSchema = new SimpleSchema({
  title: {
    type: String,
    optional: false,
    autoform: {
      label: 'Chart Title',
      placeholder: 'Chart Title'
    }
  },
  chartDate: {
    type: Date,
    optional: false,
    autoform: {
      label: 'Chart Date',
      placeholder: 'Chart Date',
      afFieldInput: {
        type: 'bootstrap-datetimepicker'
      }
    },
  },
  createdAt: {
    type: Date,
    optional: false,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: function() {
      if (this.isUpdate)
        return this.value;
      else
        return getLocalTime().toDate();
    }
  },
  createdBy: {
    type: String,
    optional: false,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: function() {
      if (this.isUpdate)
        return this.value;
      else
        return (this.userId &&
          Meteor.users.findOne({ _id: this.userId }).username) || 'n/a'
    }
  },
  editedBy: {
    type: String,
    optional: false,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: () =>
      (this.userId &&
       Meteor.users.findOne({ _id: this.userId }).username) || 'n/a'
  },
  editedAt: {
    type: Date,
    optional: false,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: () => getLocalTime().toDate()
  },
  tracks: {
    type: [TracksSchema],
    optional: true
  },
  featuredImage: scorpius.attribute('image', {
    label: 'Featured Image',
    optional: true
  }),
  body: scorpius.attribute('summernote', {
    label: 'Body',
    optional: true
  }),
  slug: {
    type: String,
    autoform: {
      type: 'hidden',
      label: false
    }
  }
});

export default ChartsSchema;
