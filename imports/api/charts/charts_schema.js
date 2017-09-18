import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { TracksSchema } from './tracks_schema.js';
import { Meteor } from 'meteor/meteor';

export const ChartsSchema = new SimpleSchema({
  title: {
    type: String,
    optional: false
  },
  createdAt: {
    type: Date,
    optional: false,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: function() {
      if (this.isSet || this.isUpdate)
        return this.value;
      else
        return new Date();
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
      if (this.isSet || this.isUpdate)
        return this.value;
      else
        return Meteor.user().username;
    }
  },
  editedBy: {
    type: String,
    optional: false,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: () => Meteor.user().username
  },
  editedAt: {
    type: Date,
    optional: false,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: () => new Date()
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
