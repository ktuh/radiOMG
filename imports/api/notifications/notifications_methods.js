import { Meteor } from 'meteor/meteor';

Meteor.methods({
  sendEmailNotification: function(to, subject, body) {
    check([to, subject, body], [String]);
    var sender = Meteor.settings.emailUsername;
    this.unblock();
    Email.send({ 
      to: to, 
      from: sender, 
      subject: subject, 
      html: body 
    });    
  }
});