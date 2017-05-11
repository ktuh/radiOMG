import './profile_page.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Posts } from '../../../api/posts/posts_collection.js'
import '../application/layout.js';

Template.profilePage.onCreated(function() {
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
      }
    });

    self.subscribe('postsByUser', username);
  });
});

Template.profilePage.helpers({
  profile: function() {
    var username = FlowRouter.getParam('username');
    var user = Meteor.users.findOne({username: username});
    if (user) {
      return user.profile;
    }
  },
  social: function() {
    var username = FlowRouter.getParam('username');
    var user = Meteor.users.findOne({username: username});
    if (user !== undefined && user.profile) {
      return user.profile.website || user.profile.twitter ||
             user.profile.facebook || user.profile.snapchat ||
             user.profile.soundcloud;
    } else return false;
  },
  posts: function () {
    var username = FlowRouter.getParam('username');
    var user = Meteor.users.findOne({username: username});
    var i = user._id;
    return Posts.find({userId: i}, {sort: {submitted: -1}});
  }
});
