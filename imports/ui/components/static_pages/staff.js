import './staff.html';
import Profiles from '../../../api/users/profiles_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.staff.onCreated(function() {
  var self = this;
  self.subscribe('djProfiles');
  self.subscribe('djs');
  self.subscribe('activeShows');
});

Template.staff.helpers({
  djs: () => Profiles.find({
    userId: { $in: Shows.find().fetch().map((show) => show.userId) }
  }, { sort: { name: 1 } })
});
