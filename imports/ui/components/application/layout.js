import './layout.html';

import { Template } from 'meteor/templating';

Template.layout.helpers({
  allowed: function() {
    return !Meteor.user() || !Meteor.user().profile.banned;
  }
});
