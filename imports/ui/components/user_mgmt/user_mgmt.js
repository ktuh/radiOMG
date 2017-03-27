import './user_mgmt.html';
import './user.js';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';
import '../../../api/users/users_collection.js';
import { UsersIndex } from '../../../api/users/users_index.js';

Template.userMgmt.onCreated(function() {
  var self = this;
  self.subscribe("users");
});

Template.userMgmt.helpers({
  correctRole: function() {
    return Meteor.user().roles.indexOf('admin') || Meteor.user().roles.indexOf('moderator');
  },
  attr: function() {
    return {'placeholder': 'Search Users...'};
  },
  users: function() {
    return Meteor.users.find({}, {sort: {username: 1}});
  },
  index: function() {
    return UsersIndex;
  },
  count: function() {
    return UsersIndex.getComponentDict().get('count');
  },
});

Template.userMgmt.events({
  'click input[type="checkbox"]': function(e) {
    console.log(Meteor.users.findOne({username: $(e.target).parent().prev().html()}));
    var profile = Meteor.users.findOne({username: $(e.target).parent().prev().html()}).profile;
    profile["banned"] = !profile["banned"];
    Meteor.users.update(Meteor.users.findOne({username: $(e.target).parent().prev().html()})._id, {$set: {profile: profile}});
  }
});
