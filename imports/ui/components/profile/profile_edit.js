import './profile_edit.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AutoForm } from 'meteor/aldeed:autoform';
import '../../../api/users/users_collection.js';
import { check } from 'meteor/check';

Template.profileEdit.onRendered(function() {
  var self = this;

  self.autorun(function() {
    var username = FlowRouter.getParam('username');

    self.subscribe('userData', username, {
      onReady: function () {
        var user = Meteor.users.findOne({ username: username });

        // Dirty solution, should be handled in the router but we don't have a
        // data control layer/controller there, so we redirect in the template.
        if (user === undefined) {
          BlazeLayout.render('layout', {content: 'notFound'});
        }
        else self.subscribe('profileData', user._id);
      }
    });
  });
});
