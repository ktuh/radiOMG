import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import '../users_collection.js';

Meteor.publish('userData', function (username) {
  check(username, String);
  return Meteor.users.find({username: username},
                           {fields: {'username': 1, 'profile': 1, '_id': 1}});
});

Meteor.publish("users", function() {
	return Meteor.users.find();
});
