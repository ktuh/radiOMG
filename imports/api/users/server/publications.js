import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Profiles } from '../profiles_collection.js';
import { Posts } from '../../posts/posts_collection.js';
import { _ } from 'meteor/underscore';

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

Meteor.publish('latestSevenWriters', () => {
  var posts = Posts.find({}, { sort: { submitted: -1 }, limit: 7 }).fetch();
  var ids = _.map(posts, (p, i) => p.userId);
  return Profiles.find({ userId: { $in: ids } });
});

Meteor.publish('latestSevenWritersUsernames', () => { /*
  var posts = Posts.find({}, { sort: { submitted: -1 }, limit: 7 }).fetch();
  var ids = _.map(posts, (p, i) => p.userId);
  check(ids, [String]);
  return Meteor.users.find({ _id: { $in: ids } }, { fields: 'username' });  */
  return Meteor.users.find({});
});
