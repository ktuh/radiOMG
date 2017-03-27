import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { pagination } from 'meteor/kurounin:pagination';
import '../users_collection.js';

Meteor.publish('userData', function (username) {
  check(username, String);
  return Meteor.users.find({username: username},
                           {fields: {'username': 1, 'profile': 1, '_id': 1}});
});

Meteor.publish("usersIndex", function() {
  return Meteor.users.find();
});


new Meteor.Pagination(Meteor.users);
