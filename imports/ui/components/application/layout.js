import './layout.html';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.layout.helpers({
  home: () => FlowRouter.getRouteName() === 'home'
});
