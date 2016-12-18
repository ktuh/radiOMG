import './notifications.html';
import { Template } from 'meteor/templating'; 

Template.notifications.onCreated(function () {
  var self = this;
  self.autorun(function() {
    self.subscribe('notifications');
  })
});

Template.notifications.helpers({
  notifications: function () {
    return Notifications.find({userId: Meteor.userId(),
                               read: false});
  },
  notificationCount: function () {
    return Notifications.find({
      userId: Meteor.userId(),
      read: false}).count();
  }
});

Template.notificationItem.helpers({
  notificationPostPath: function(itemId) {
    return FlowRouter.path('podcastPage', this.itemId);
  }
});

Template.notificationItem.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});
