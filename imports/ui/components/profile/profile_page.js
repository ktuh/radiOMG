import './profile_page.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Posts } from '../../../api/posts/posts_collection.js';
import { Profiles } from '../../../api/users/profiles_collection.js';
import { Shows } from '../../../api/shows/shows_collection.js';
import { Bert } from 'meteor/themeteorchef:bert';
import '../application/layout.js';

Template.profilePage.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var username = FlowRouter.getParam('username');

    self.subscribe('userData', username, {
      onReady: function() {
        var user = Meteor.users.findOne({ username: username });

        // Dirty solution, should be handled in the router but we don't have a
        // data control layer/controller there, so we redirect in the template.
        if (user === undefined) {
          BlazeLayout.render('layout', {content: 'notFound'});
        }
        else {
          self.subscribe('profileData', user._id);
          self.subscribe('showByUserId', user._id);
        }
      }
    });
    self.subscribe('postsByUser', username);
  });
});

Template.profilePage.helpers({
  negB1orB2: (b1,b2) => (!b1 || b2),
  isAdmin: () => Meteor.user() !== null ? Meteor.user().roles.indexOf('admin') > -1 : false,
  isBanned: () => {
    var user = Meteor.users.findOne({ username: FlowRouter.getParam("username" )});
    var profile = Profiles.findOne({ userId: user._id });
    return profile.banned;
  },
  profile: function() {
    var username = FlowRouter.getParam('username');
    var user = Meteor.users.findOne({ username: username});
    var profile = Profiles.findOne({ userId: user._id });

    if (profile !== undefined) {
      return profile;
    } else return false;
  },
  social: function() {
    var username = FlowRouter.getParam('username');
    var user = Meteor.users.findOne({ username: username});
    var profile = Profiles.findOne({ userId: user._id });

    if (profile !== undefined) {
      return profile.website || profile.twitter || profile.facebook ||
             profile.snapchat || profile.soundcloud;
    } else return false;
  },
  posts: function() {
    var username = FlowRouter.getParam('username');
    var user = Meteor.users.findOne({ username: username});
    var posts = Posts.find({userId: user._id}, {sort: {submitted: -1}})

    return posts.count() > 0 && posts;
  },
  ownProfile: function() {
    var username = FlowRouter.getParam('username');
    var user = Meteor.users.findOne({ username: username});
    var profile = Profiles.findOne({ userId: user._id });

    return Meteor.userId() && profile.userId === Meteor.userId();
  },
  show: function() {
    var user = Meteor.users.findOne({ username: FlowRouter.getParam("username") });
    console.log(user._id);
    return Shows.findOne({ userId: user._id });
  }
});

Template.profilePage.events({
  'click #profile__ban-user': (e) => {
    if (Meteor.user().roles.indexOf('admin') > -1) {
      var username = FlowRouter.getParam("username");
      var user = Meteor.users.findOne({ username: username});
      var profile = Profiles.findOne({ userId: user._id });
      Profiles.update(profile._id, {$set: {banned: true}});
      Bert.alert("User @" + username + " banned.", "default");
    }
  },
  'click #profile__unban-user': (e) => {
    if (Meteor.user().roles.indexOf('admin') > -1) {
      var username = FlowRouter.getParam("username");
      var user = Meteor.users.findOne({ username: username});
      var profile = Profiles.findOne({ userId: user._id });
      Profiles.update(profile._id, {$set: {banned: false}});
      Bert.alert("User @" + username + "'s ban lifted.", "default");
    }
  }
});
