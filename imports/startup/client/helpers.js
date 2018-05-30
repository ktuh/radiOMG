import { Template } from 'meteor/templating';
import Profiles from '../../api/users/profiles_collection.js';

Template.registerHelper('displayNameById', (userId) =>
  Profiles.findOne({ userId: userId }).name);

Template.registerHelper('usernameById', (userId) =>
  Meteor.users.findOne({ _id: userId }).username);

Template.registerHelper('usernameFromDisplayName', (name) => {
  var profile = Profiles.findOne({ name: name });
  var user = profile && Meteor.users.findOne({ _id: profile.userId });
  return user && user.username;
});

Template.registerHelper('displayNameFromUsername', (username) =>
  Profiles.findOne({ userId: Meteor.users.findOne({
    username: username
  })._id }).name);

Template.registerHelper('showByShowId', (spinId) =>
  Shows.findOne({ showId: spinId }));

Template.registerHelper('timeDiff', (str) => moment(str).fromNow());
