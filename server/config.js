import { Meteor } from 'meteor/meteor';
import { AccountsServer } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { _ } from 'meteor/underscore';
import { Profiles } from '../imports/api/users/profiles_collection.js';

Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://' +
    encodeURIComponent(Meteor.settings.emailUsername) + ':' +
    encodeURIComponent(Meteor.settings.emailPassword) + '@' +
    encodeURIComponent(Meteor.settings.emailServer) + ':'  +
    Meteor.settings.emailPort;

  Accounts.emailTemplates.siteName = 'KTUH Honolulu';

  Accounts.emailTemplates.verifyEmail.from = function() {
    return 'KTUH Accounts <davey@ktuh.org>';
  };

  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address for KTUH Honolulu';
  };

  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Hi, ' + user.username + ',\n\n'
      + 'Mahalo for registering for the KTUH Honolulu website. Please click on the '
      + 'following link to verify your email address: \r\n\n' + url
      + '\n\n';
  };

  Accounts.emailTemplates.resetPassword.from = function() {
    return 'KTUH Accounts <davey@ktuh.org>';
  };

  Accounts.emailTemplates.resetPassword.subject = function(user) {
    return 'Reset Your Password on KTUH Honolulu';
  };

  Accounts.config({
    sendVerificationEmail: true
  });

  // BUGFIX: Another package has set this to true. Attempting to do this thru
  // Accounts.config() will fail.
  Accounts._options.forbidClientAccountCreation = false;

  Accounts.validateLoginAttempt(function(type) {
    if (type.user && type.user.emails && !type.user.emails[0].verified ) {
      if (type.user && type.user.firstLogin == true) {
        type.user.firstLogin = false;
        return true;
      } else {
        throw new Meteor.Error(100001, "Please verify your email address. (Check your inbox.)");
        return false;
      }
    }
    return true;
  });

  Accounts.onCreateUser((options, user) => {
    Profiles.insert({userId: user._id});
    return user;
  });

  Accounts.validateNewUser((user) =>
     user.username !== "" && user.emails !== undefined);
});
