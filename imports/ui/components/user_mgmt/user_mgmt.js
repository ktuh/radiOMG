import './user_mgmt.html';
import '../../../api/users/users_collection.js';
import { pagination } from 'meteor/kurounin:pagination';

Template.userMgmt.onCreated(function() {
  var self = this;
  self.pagination = new Meteor.Pagination(Meteor.users, {sort: {username: 1}});
  self.subscribe("users");
});

Template.userMgmt.helpers({
  isReady: function() {
    return Template.instance().pagination.ready();
  },
  correctRole: function() {
    return Meteor.user().roles.indexOf("admin") > -1 || Meteor.user().roles.indexOf("moderator") > -1;
  },
  userList: function() {
    return Meteor.users.find({}, {sort: {username: 1}});
  },
  templatePagination: function() {
    return Template.instance().pagination;
  },
  pages: function() {
    return Template.instance().pagination.getPage();
  }
});

Template.userMgmt.events({
  'click input[type="checkbox"]': function(e) {
    console.log(Meteor.users.findOne({username: $(e.target).parent().prev().html()}));
    var profile = Meteor.users.findOne({username: $(e.target).parent().prev().html()}).profile;
    profile["banned"] = !profile["banned"];
    Meteor.users.update(Meteor.users.findOne({username: $(e.target).parent().prev().html()})._id, {$set: {profile: profile}});
  }
});
