import { Meteor } from 'meteor/meteor';
import Notifications from '../notifications_collection.js';

Meteor.publish('notifications', function () {
  return Notifications.find({ userId: this.userId, read: false });
});
