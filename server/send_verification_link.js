import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';
import { check } from 'meteor/check';

Meteor.methods({
  resendVerificationLink: function(email) {
    check(email, String)
    var user = Meteor.users.findOne({ 'emails.0.address': email,
      'emails.0.verified': false });
    if (user) {
      var emailService = user.services.email, tokens;

      if (emailService !== undefined) {
        tokens = emailService.verificationTokens;
      }
      else {
        return undefined;
      }

      var lastSent = tokens.slice(-1)[0].when;

      if (moment().diff(lastSent) >= 1800000) {
        return Accounts.sendVerificationEmail(user._id);
      }
      else {
        return 1;
      }
    }
    else {
      return 3;
    }
  }
});
