import './user_mgmt.html';
import './user.js';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';
import '../../../api/users/users_collection.js';
import { UsersIndex } from '../../../api/users/users_index.js';
import { Profiles } from '../../../api/users/profiles_collection.js';

Template.userMgmt.onCreated(function() {
  var self = this;
  self.subscribe('users');
  self.subscribe('profiles');
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
    return Meteor.users.find({}).length;
  },
});

Template.userMgmt.events({
  'click input[type="checkbox"]': function(e) {
    var id = Meteor.users.findOne({username: $(e.target).parent().prev().html()})._id;
    var profile = Profiles.findOne({userId: id});
    var newVal = !profile["banned"];
    Profiles.update(profile._id, {$set: {banned: newVal}});
  }
});
