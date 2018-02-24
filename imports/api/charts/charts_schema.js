import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import TracksSchema from './tracks_schema.js';
import { Meteor } from 'meteor/meteor';
import moment from 'moment-timezone';

export default ChartsSchema = new SimpleSchema({
  title: {
    type: String,
    optional: false
  },
  chartDate: {
    type: Date,
    optional: true,
    autoform: {
      label: 'Chart Date'
    },
    autoValue: function() {
      if (this.isSet)
        return this.value;
      else
        return moment(new Date()).tz("Pacific/Honolulu").toDate();
    }
  },
  createdAt: {
    type: Date,
    optional: false,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: function() {
      if (this.isSet)
        return this.value;
      else
        return moment(new Date()).tz("Pacific/Honolulu").toDate();
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
      if (this.isSet)
        return this.value;
      else
        return (this.userId && Meteor.users.findOne({_id: this.userId}).username) || "n/a"
    }
  },
  editedBy: {
    type: String,
    optional: false,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: () => (this.userId && Meteor.users.findOne({_id: this.userId}).username) || "n/a"
  },
  editedAt: {
    type: Date,
    optional: false,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: () => moment(new Date()).tz("Pacific/Honolulu").toDate()
  },
  tracks: {
    type: [TracksSchema],
    optional: false
  },
  featuredImage: scorpius.attribute('image', {
    label: 'Featured Image',
    optional: false
  }),
  body: scorpius.attribute('summernote', {
    label: 'Body'
  }),
  slug: {
    type: String,
    autoform: {
      type: 'hidden',
      label: false
    }
  }
});
