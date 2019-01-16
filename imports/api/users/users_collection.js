import { Meteor } from 'meteor/meteor';

Meteor.users.allow({
  update: function () {
    var adm = Meteor.user().hasRole('admin');
    var mod = Meteor.user().hasRole('moderator');
    return adm || mod;
  },
  fetch: ['userId']
});
