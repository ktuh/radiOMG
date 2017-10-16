import './staff.html';
import Profiles from '../../../api/users/profiles_collection.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import Shows from '../../../api/shows/shows_collection.js';

Template.staff.onCreated(function() {
  var self = this;
  self.subscribe('djProfiles');
  self.subscribe('djs');
  self.subscribe('activeShows');
});

Template.staff.helpers({
  djs: () => Profiles.find({}),
  usernameOf: (id) => Meteor.users.findOne({_id: id}).username,
});
