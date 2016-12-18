import './errors.html';
import '../notifications/notifications.js';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import Errors from '../../../../client/helpers/errors.js';
import { Notifications } from '../../../api/notifications/notifications_collection.js';

var IGNORE_CONNECTION_ISSUE_KEY = 'ignoreConnectionIssue';

Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

Template.error.onRendered(function() {
  var error = this.data;
  Meteor.setTimeout(function () {
    Errors.remove(error._id);
  }, 6500);
});

Template.errors.helpers({
	notifications: function () {
    return Notifications.find({userId: Meteor.userId(),
                               read: false});
  },
  connected: function() {
    return Session.get(IGNORE_CONNECTION_ISSUE_KEY) ||
      Meteor.status().connected;
  }
});
