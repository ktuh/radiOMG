import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://' +
    encodeURIComponent(Meteor.settings.emailUsername) + ':' +
    encodeURIComponent(Meteor.settings.emailPassword) + '@' +
    encodeURIComponent(Meteor.settings.emailServer) + ':'  +
    Meteor.settings.emailPort;

  Accounts.emailTemplates.siteName = '808mix';

  Accounts.emailTemplates.verifyEmail.from = function() {
    return '808Mix Accounts <davey@ktuh.org>';
  };

  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address for 808mix';
  };

  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Hi, ' + user.username + ',\n\n'
      + 'Mahalo for registering for the 808mix app. Please click on the '
      + 'following link to verify your email address: \r\n\n' + url
      + '\n\n';
  };

  Accounts.emailTemplates.resetPassword.from = function() {
    return '808Mix Accounts <davey@ktuh.org>';
  };

  Accounts.emailTemplates.resetPassword.subject = function(user) {
    return 'Reset Your Password on 808mix';
  };

  Accounts.config({
    sendVerificationEmail: true
  });

  // BUGFIX: Another package has set this to true. Attempting to do this thru
  // Accounts.config() will fail.
  Accounts._options.forbidClientAccountCreation = false;

  Accounts.validateLoginAttempt(function(type) {
    if (type.user && type.user.emails && !type.user.emails[0].verified )
      if (type.user && type.user.firstLogin == true) {
        type.user.firstLogin = false;
        return true;
      } else {
        throw new Meteor.Error(100001, "Please verify your email address. (Check your inbox.)");
        return false;
      }

      return true;
    });
});

