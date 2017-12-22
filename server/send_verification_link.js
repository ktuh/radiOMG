import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';
import ResendQueue from '../imports/api/resend_queue/resend_queue.js';

Meteor.methods({
  resendVerificationLink: function(email) {
    var id = Meteor.users.findOne({emails: {address: email, verified: false}})._id;
    if (id) {
      var lastSent = ResendQueue.findOne({userId: id}).lastSent;

      if (moment().diff(lastSent) >= 1800000) {
        var nodeId = ResendQueue.findOne({userId: id})._id

        if (nodeId) ResendQueue.update(nodeId, { $set: { lastSent: new Date()} });
        else ResendQueue.insert({userId: id, lastSent: new Date()});

        return Accounts.sendVerificationEmail(id);
      }
      else if (moment().diff(lastSent) < 1800000) {
        return 1;
      }
    }
    else {
      return 3;
    }
  }
});
