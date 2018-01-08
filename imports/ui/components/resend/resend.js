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
  },
  'change .validate': () => {
    switch($('.validate').val().length) {
      case 0:
        $(".submit").prop("disabled", true);
        break;
      default:
        if ($('.validate').val().match(/[A-Za-z0-9.]+@([a-z0-9.])+\.[a-z]{2,3}/) !== null) {
          if ($(".submit").prop("disabled")) {
            $(".submit").prop("disabled", false);
          }
        }
        else {
          if (!$(".submit").prop("disabled")) {
            $(".submit").prop("disabled", true);
          }
        }
    }
  }
});
