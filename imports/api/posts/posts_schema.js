import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const PostsSchema = new SimpleSchema({
  userId: {
    type: String,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: function() {
      if (this.isSet || this.isUpdate)
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
      if (this.isSet || this.isUpdate)
        return this.value;
      else
        return Meteor.user().username;
    }
  },
  photo: scorpius.attribute('image', {
    label: 'Image',
    optional: true
  }),
  submitted: {
    type: Date,
    autoform: {
      type: 'hidden',
      label: false
    },
    defaultValue: new Date()
  },
  title: {
    type: String,
    label: 'Title',
    optional: false
  },
  tags: {
    type: [String],
    optional: true
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
  commentCount: {
    type: Number,
    label: 'Comment Count',
    defaultValue: 0,
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  isChart: {
    type: Boolean
  },
  approved: {
    type: Boolean,
    optional: true,
    defaultValue: false,
    label: 'Approved'
  }
});
