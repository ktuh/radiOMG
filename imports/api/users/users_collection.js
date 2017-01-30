import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { UsersSchema } from './users_schema.js';

Meteor.users.allow({
    update: function (userId, doc, fieldNames, modifier) {
      var valid = userId === doc._id;
      return valid;
    },
    fetch: ['userId']
});

Meteor.users.attachSchema(UsersSchema);
