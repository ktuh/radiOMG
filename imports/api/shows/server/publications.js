import { Meteor } from 'meteor/meteor';
import { Shows } from '../shows_collection.js'

Meteor.publish('shows', function() {
  return Shows.find({ active: true }, { fields: { body: 0, url: 0}});
});

Meteor.publish('singleShow', function(slug) {
  check(slug, String);
  return Shows.find({ slug: slug });
});

Meteor.publish('activeShows', function() {
  return Shows.find({ active: true });
});

Meteor.publish('showHostUserName', function(id) {
  check(id, String);
  return Meteor.users.find({ _id: id }, { fields: { username: 1 }});
});