import './layout.html';
import { Template } from 'meteor/templating';

Template.layout.helpers({
  home: () => FlowRouter.getRouteName() === 'home'
});
