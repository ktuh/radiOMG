import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Profiles from '../profiles_collection.js';
import Posts from '../../posts/posts_collection.js';
import Shows from '../../shows/shows_collection.js';

import { _ } from 'underscore';

Meteor.publish('userData', function(username) {
  check(username, String);
  return Meteor.users.find({ username: username }, {
    fields: { 'username': 1 }
  });
});

Meteor.publish('userById', function(id) {
  check(id, String);
  return Meteor.users.find({ _id: id }, { fields: { 'username': 1 } });
});

Meteor.publish('userByDisplayName', function(name) {
  check(name, String);
  return Meteor.users.find({ _id: Profiles.findOne({ name: name }).userId },
    { fields: { 'username': 1 } });
});

Meteor.publish('bannedProfiles', function() {
  return Profiles.find({ banned: true });
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

Meteor.publish('latestSevenWriters', () => {
  var featured = Posts.find({ featured: true, approved: true },
    { sort: { submitted: -1 }, limit: 1 }).fetch();
  var nonFeatured = Posts.find({ featured: false, approved: true },
    { sort: { submitted: -1 }, limit: 6 }).fetch();
  var posts = nonFeatured.concat(featured);
  var ids = _.uniq(_.map(posts, (p) => p.userId));
  return Profiles.find({ userId: { $in: ids } });
});

Meteor.publish('latestSevenWritersUsernames', () => {
  var featured = Posts.find({ featured: true, approved: true },
    { sort: { submitted: -1 }, limit: 1 }).fetch();
  var nonFeatured = Posts.find({ featured: false, approved: true },
    { sort: { submitted: -1 }, limit: 6 }).fetch();
  var posts = nonFeatured.concat(featured);
  var ids = _.uniq(_.map(posts, (p) => p.userId));
  return Meteor.users.find({ _id: { $in: ids } },
    { fields: { 'username': 1 } });
});

Meteor.publish('profileNamesById', (ids) => {
  check(ids, [String]);
  return Profiles.find({ userId: { $in: ids } });
});

Meteor.publish('djProfiles', () => {
  var djs = Meteor.users.find({ roles: 'dj' },
    { fields: { 'username': 1, '_id': 1 } }).fetch();
  var userIds = _.map(djs, (p) => p._id);
  return Profiles.find({ userId: { $in: userIds } });
});

Meteor.publish('activeDjProfiles', function() {
  var activeShows = Shows.find({ active: true }).fetch();
  var activeDjs = activeShows.map(function(shows) {
    return shows.userId;
  });
  return Profiles.find({ userId: { $in: activeDjs } });
});

Meteor.publish('djs', () =>
  Meteor.users.find({ roles: 'dj' }, { fields: { 'username': 1 } }));

Meteor.publish('activeDjs', function() {
  var activeShows = Shows.find({ active: true }).fetch();
  var activeDjs = activeShows.map(function(shows) {
    return shows.userId;
  });
  return Meteor.users.find({ _id: { $in: activeDjs } });
});
