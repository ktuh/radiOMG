import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { orion } from 'meteor/orionjs:core';

export const PagesSchema = new SimpleSchema({
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
  submitted: {
    type: Date,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: () => new Date()
  },
  title: {
    type: String,
    label: 'Title',
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
  }
});
