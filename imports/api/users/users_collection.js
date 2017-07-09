import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Meteor.users.allow({
    update: function (userId, doc, fieldNames, modifier) {
      var adm = Meteor.user().hasRole("admin");
      var mod = Meteor.user().hasRole('moderator');
      var own = doc._id === userId;
      return adm || mod || own;
    },
    fetch: ['userId']
});
