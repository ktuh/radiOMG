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
  'keyup .validate': () => {
    var val = $('.validate').val();
    if (val.length) {
      var regex = /.+@(.+){2,}\.(.+){2,}/;
      var match = val.match(regex);
      if (match !== null && $(".submit").prop("disabled")) {
        $(".submit").prop("disabled", false);
      }
      else if (match === null && !$(".submit").prop("disabled")) {
        $(".submit").prop("disabled", true);
      }
    }
    else {
      $(".submit").prop("disabled", true);
    }
  }
});
