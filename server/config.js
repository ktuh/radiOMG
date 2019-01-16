import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Profiles from '../imports/api/users/profiles_collection.js';
import { Roles } from 'meteor/nicolaslopezj:roles';
import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://' +
    encodeURIComponent(Meteor.settings.emailUsername) + ':' +
    encodeURIComponent(Meteor.settings.emailPassword) + '@' +
    encodeURIComponent(Meteor.settings.emailServer) + ':'  +
    Meteor.settings.emailPort;

  Accounts.emailTemplates.siteName = 'KTUH Honolulu';

  Accounts.emailTemplates.verifyEmail.from = function() {
    return 'KTUH Accounts <webmaster@ktuh.org>';
  };

  Accounts.emailTemplates.verifyEmail.subject = function() {
    return 'Confirm Your Email Address for KTUH Honolulu';
  };

  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return `Hi ${user.username},` + '\n\n' +
    'Mahalo for registering for the KTUH Honolulu website.\n' +
    'Please click on the following link to verify your email address:\n\n' +
    url;
  };

  Accounts.emailTemplates.resetPassword.from = function() {
    return 'KTUH Accounts <webmaster@ktuh.org>';
  };

  Accounts.emailTemplates.resetPassword.subject = function() {
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
      if (type.user.firstLogin) {
        type.user.firstLogin = false;
        return true;
      } else {
        throw new Meteor.Error(100001,
          'Please verify your email address. (Check your inbox.)');
      }
    }
    return true;
  });

  Accounts.onCreateUser((options, user) => {
    var id = Profiles.insert({ userId: user._id });
    Roles.addUserToRoles(user._id, ['member']);
    Profiles.update({ _id: id }, { $set: { photo: {
      url: '/img/ktuh-logo-white-alpha.png',
      fileId: 'd3r3K15suPr3m3d03',
      info: {
        width: 150,
        height: 150,
        backgroundColor: '#000000',
        primaryColor: '#000000',
        secondaryColor: '#000000'
      }
    } } });
    // We want to save email, user name, and first/last names
    // if they used a login svc.
    if (user.services.facebook || user.services.google) {
      var email;
      if (user.services.facebook) email =  user.services.facebook.email;
      else email = user.services.google.email;
      var username = email.substring(0, email.indexOf('@'));
      var existentUser = Meteor.users.findOne({ username: username });

      for (var i = 1; i < 1000000; i++) {
        if (existentUser === undefined)
          break;
        var numStr = Number(i).toString();
        username = username + '-' +  numStr;
        existentUser = Meteor.users.findOne({ username: username });
      }

      if (user.services.google && user.services.google.given_name &&
          user.services.google.given_name !== '') {
        Profiles.update({ _id: id },
          { $set: { name: user.services.google.name } });
      }
      else if (user.services.facebook && user.services.facebook.name &&
               user.services.facebook.given_name !== '') {
        Profiles.update({ _id: id },
          { $set: { name: user.services.facebook.name } });
      }

      user.username = username;
      user.emails = [{ address: email, verified: true }];
      user.roles = [ 'member' ];
    }
    return user;
  });

  Accounts.validateNewUser((user) =>
    (user.services && user.services.facebook) ||
    (user.services && user.services.google) ||
    (user.username !== '' && user.emails !== undefined));

  ServiceConfiguration.configurations.remove({
    service: 'facebook'
  });

  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: Meteor.settings.facebookAppId,
    secret: Meteor.settings.facebookAppSecret
  });

  ServiceConfiguration.configurations.remove({
    service: 'google'
  });

  ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: Meteor.settings.googleClientId,
    secret: Meteor.settings.googleClientSecret
  });
});
