import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Profiles } from '../profiles_collection.js';

Meteor.publish('userData', function(username) {
  check(username, String);
  return Meteor.users.find({username: username},
                           {fields: {'username': 1, '_id': 1}});
});

Meteor.publish('users', function() {
  return Meteor.users.find();
});

Meteor.publish('profileData', function(userId) {
  console.log(userId);
  check(userId, String);
  return Profiles.find({ userId: userId });
});
