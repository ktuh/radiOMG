import './staff.html';
import Profiles from '../../../api/users/profiles_collection.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.staff.onCreated(function() {
  var self = this;
  self.subscribe('djProfiles');
  self.subscribe('djs');
});

Template.staff.helpers({
  djs: () => Profiles.find({}, { sort: { name: 1 } })
});
