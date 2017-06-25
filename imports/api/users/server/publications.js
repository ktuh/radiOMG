import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Profiles } from '../profiles_collection.js';

Meteor.publish('userData', function(username) {
  check(username, String);
  return Meteor.users.find({username: username},
                           {fields: {'username': 1, '_id': 1}});
});

Meteor.publish('bannedProfiles', function() {
  return Profiles.find({banned: true});
});

Meteor.publish('profileData', function(userId) {
  check(userId, String);
  return Profiles.find({ userId: userId });
});

Meteor.publish('profileDataByUsername', function(username) {
  check(username, String);
  var user = Meteor.users.findOne({ username: username });
  return Profiles.find({ userId: user._id });
});
