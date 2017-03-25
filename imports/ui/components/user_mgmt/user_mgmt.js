import './user_mgmt.html';
import '../../../api/users/users_collection.js';

Template.userMgmt.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe("users");
  });
});

Template.userMgmt.helpers({
  correctRole: function() {
    return Meteor.user().roles.indexOf("admin") > -1 || Meteor.user().roles.indexOf("moderator") > -1;
  },
  userList: function() {
    return Meteor.users.find({}, {sort: {username: 1}});
  }
});
