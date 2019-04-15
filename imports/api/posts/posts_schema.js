import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { thumbnailUrl, getLocalTime } from '../../startup/lib/helpers.js';
import { scorpius } from 'meteor/scorpiusjs:core';

var PostsSchema = new SimpleSchema({
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
  photo: scorpius.attribute('image', {
    label: 'Image',
    optional: true
  }),
  thumbnail: {
    type: String,
    optional: true,
    autoValue: function() {
      var url = this.siblingField('photo.url').value;
      if (url) return thumbnailUrl(url, 320);
    }
  },
  submitted: {
    type: Date,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: function () {
      return this.isUpdate ?  this.value : getLocalTime().toDate();
    }
  },
  title: {
    type: String,
    label: 'Title',
    optional: false,
    max: 80
  },
  tags: {
    type: [String],
    optional: true
  },
  category: {
    type: String,
    optional: false,
    defaultValue: 'Radioblog'
  },
  summary: {
    type: String,
    label: 'Summary',
    optional: false,
    autoform: {
      type: 'textarea',
      rows: 3
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
  featured: {
    type: Boolean,
    optional: true,
    defaultValue: false,
    label: 'Featured'
  },
  approved: {
    type: Boolean,
    optional: true,
    defaultValue: false,
    label: 'Approved'
  }
});

export default PostsSchema;
