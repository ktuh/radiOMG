import './resend.html';
import { Template } from 'meteor/templating';

Template.resend.helpers({
  verified: () => Meteor.user() && Meteor.user().emails[0].verified
});

Template.resend.events({
  'click .submit': () => {
    $(".submit").prop("disabled", true);
    Meteor.call('resendVerificationLink', $("input[type='email']").val(), (error, result) => {
      switch(result) {
        case 1:
          $(".submit").text("Wait 30 minutes and try again.");
          break;
        case 3:
          $(".submit").text("Could not find unverified user with specified email.");
          break;
        case undefined:
          $(".submit").text("An unknown error has occurred.");
          break;
        default:
          $(".submit").text("Email sent.");
      }
    });
  }
});
