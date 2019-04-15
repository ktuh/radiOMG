import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
/*
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});
*/

Accounts.onEmailVerificationLink((token, done) => {
  Accounts.verifyEmail(token, error => {
    alert('Email verified!');
    done();
  });
});
