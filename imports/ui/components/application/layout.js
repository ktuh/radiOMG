import './layout.html';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Notices from '../../../api/notices/notices_collection.js';
import "../includes/banner.js";

Template.layout.onCreated(function() {
  var self = this;
  self.subscribe("notices");
});

Template.layout.helpers({
  home: () => FlowRouter.getRouteName() === 'home',
  notice: () => Notices.findOne({})
});
