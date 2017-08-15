import './loginButtons.html';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template._loginButtonsLoggedInDropdown.events({
  'click #login-buttons-view-profile': (event) => {
    FlowRouter.go('profilePage', { username: Meteor.user().username });
  },
  'click #login-buttons-edit-profile': (event) => {
    FlowRouter.go('profileEdit');
  }
});
