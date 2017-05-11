import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { scorpius } from 'meteor/scorpiusjs:core';

const ProfileSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'DJ Name',
    optional: true
  },
  photo: scorpius.attribute("image", {
    label: "Image", 
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
  },
  banned: {
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
  },
  emails: {
    type: [Object],
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    label: "Created on",
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
