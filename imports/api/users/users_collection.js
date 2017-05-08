import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { UsersSchema } from './users_schema.js';

Meteor.users.allow({
    update: function (userId, doc, fieldNames, modifier) {
      var adm = Meteor.user().roles.indexOf('admin') > -1 || false;
      var mod = Meteor.user().roles.indexOf('moderator') > -1 || false;
      var own = doc._id === userId;
      return adm || mod || own;
    },
    fetch: ['userId']
});

Meteor.users.attachSchema(UsersSchema);
