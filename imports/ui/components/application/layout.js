import './layout.html';

import { Template } from 'meteor/templating';

Template.layout.helpers({
  allowed: () => !Meteor.user() || !Meteor.user().profile.banned,
  home: () => FlowRouter.getRouteName() === 'home'
});
