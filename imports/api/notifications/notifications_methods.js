import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  sendEmailNotification: function(to, subject, body, form) {
    check(to, String);
    check(subject, String);
    check(body, String);
    check(form, Boolean);
    var sender =  Meteor.settings.emailUsername;
    var replyTo = undefined;
    if (form) replyTo = Meteor.users.findOne({
      _id: this.userId
    }).emails[0].address;
    this.unblock();
    var sendContents = {};
    sendContents.to = to;
    sendContents.subject = subject;
    sendContents.html = body;
    sendContents.from = sender;
    if (replyTo !== undefined) sendContents.replyTo = replyTo;
    Email.send(sendContents);
  }
});
