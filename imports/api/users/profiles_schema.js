import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { scorpius } from 'meteor/scorpiusjs:core';
import { thumbnailUrl } from '../../startup/lib/helpers.js';

var ProfilesSchema = new SimpleSchema({
  userId: {
    type: String,
    label: 'User ID',
  },
  name: {
    type: String,
    label: 'Display Name',
    optional: true
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
      if (url) return thumbnailUrl(url, 688);
    }
  },
  bio: {
    type: String,
    label: 'Bio',
    autoform: {
      afFieldInput: {
        type: 'summernote'
      }
    },
    optional: true
  },
  website: {
    type: String,
    label: 'Website',
    optional: true
  },
  soundcloud: {
    type: String,
    label: 'Soundcloud',
    optional: true
  },
  instagram: {
    type: String,
    label: 'Instagram',
    optional: true
  },
  facebook: {
    type: String,
    label: 'Facebook',
    optional: true
  },
  twitter: {
    type: String,
    label: 'Twitter',
    optional: true
  },
  snapchat: {
    type: String,
    label: 'Snapchat',
    optional: true
  },
  banned: {
    type: Boolean,
    label: 'Banned',
    optional: true,
    defaultValue: false
  }
});

export default ProfilesSchema;
