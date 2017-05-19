import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { scorpius } from 'meteor/scorpiusjs:core';

export const ProfilesSchema = new SimpleSchema({
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
  }
});