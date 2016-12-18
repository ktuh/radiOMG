import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { orion } from 'meteor/orionjs:core';

var ProfileSchema = new SimpleSchema({
  "profile.name": {
    type: String,
    label: 'DJ Name',
    optional: true
  },
  "profile.photo": orion.attribute('image', {
    label: 'Photo',
    optional: true
  }),
  "profile.bio": {
    type: String,
    label: 'Bio',
    optional: true
  },
  "profile.website": {
    type: String,
    label: 'Website',
    optional: true
  },
  "profile.soundcloud": {
    type: String,
    label: 'Soundcloud',
    optional: true
  },
  "profile.instagram": {
    type: String,
    label: 'Instagram',
    optional: true
  },
  "profile.facebook": {
    type: String,
    label: 'Facebook',
    optional: true
  },
  "profile.twitter": {
    type: String,
    label: 'Twitter',
    optional: true
  },
  "profile.snapchat": {
    type: String,
    label: 'Snapchat',
    optional: true
  }
});

export const UsersSchema = new SimpleSchema({
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,20}$/
  },
  emails: {
    type: [Object],
    optional: true
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: ProfileSchema,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true
  }
});