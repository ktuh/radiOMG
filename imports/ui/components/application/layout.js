import './layout.html';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.layout.helpers({
  home: () => FlowRouter.getRouteName() === 'home'
});
