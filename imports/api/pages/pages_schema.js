import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { scorpius } from 'meteor/scorpiusjs:core';
import { FlowRouter } from 'meteor/kadira:flow-router';
import moment from 'moment-timezone';

export default PagesSchema = new SimpleSchema({
  userId: {
    type: String,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: function() {
      if (this.isSet || this.isUpdate) return this.value;
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
      if (this.isSet || this.isUpdate) return this.value;
      return Meteor.user().username;
    }
  },
  submitted: {
    type: Date,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: () => moment(new Date()).tz("Pacific/Honolulu").toDate()
  },
  title: {
    type: String,
    label: 'Title',
    optional: false,
    custom: function() {
      // This validation function is necessary for checking if there are naming
      // conflicts with existing routes. Shout-out to @todda00 for providing
      // parts of this function from his friendly-slugs package.
      if (FlowRouter._routes.map((obj) => obj.path.substr(1)).indexOf(this.value.replace(/'/g, '').replace(/[^0-9a-z-]/g, '-').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '')) >= 0) return "Nope.";
    }
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
  }
});
