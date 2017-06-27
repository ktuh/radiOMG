import './profile_edit.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AutoForm } from 'meteor/aldeed:autoform';
import '../../../api/users/users_collection.js';
import { check } from 'meteor/check';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles } from '../../../api/users/profiles_collection.js';

Template.profileEdit.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var userId = Meteor.userId();

    if (userId === null) {
      FlowRouter.go('home');
    }
    else self.subscribe('profileData', userId);
  });
});

Template.profileEdit.helpers({
  currentProfile: () => {
    return Profiles.findOne({ userId: Meteor.userId() });
  },
  collection: () => Profiles
});
