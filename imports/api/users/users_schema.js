import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { scorpius } from 'meteor/scorpiusjs:core';

const ProfileSchema = new SimpleSchema({
  "name": {
    type: String,
    label: 'DJ Name',
    optional: true
  },
  "photo": scorpius.attribute("image", {label: "Image", optional: true}),
  "bio": {
    type: String,
    label: 'Bio',
    autoform: {
      afFieldInput: {
        type: 'summernote'
      }
    },
    optional: true
  },
  "website": {
    type: String,
    label: 'Website',
    optional: true
  },
  "soundcloud": {
    type: String,
    label: 'Soundcloud',
    optional: true
  },
  "instagram": {
    type: String,
    label: 'Instagram',
    optional: true
  },
  "facebook": {
    type: String,
    label: 'Facebook',
    optional: true
  },
  "twitter": {
    type: String,
    label: 'Twitter',
    optional: true
  },
  "snapchat": {
    type: String,
    label: 'Snapchat',
    optional: true
  },
  "banned": {
    type: Boolean,
    label: 'Ban User',
    optional: true,
    autoform: {
      type: "hidden",
      label: false
    }
  }
});

export const UsersSchema = new SimpleSchema({
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,20}$/,
    optional: true
  },
  emails: {
    type: [Object],
    optional: true
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },
  "emails.$.verified": {
    type: Boolean,
    optional: true
  },
  createdAt: {
    type: Date,
    label: "Created on",
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
      else {
        this.unset();
      }
    }
  },
  modified: {
    type: Date,
    label: "Modified on",
    optional: true,
    autoValue: function () {
        if (this.isInsert) {
          this.unset();
        } else {
          return new Date;
        }
    }
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
