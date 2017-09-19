import './charts_page.html';
import { Template } from 'meteor/templating';
import { Charts } from '../../../api/charts/charts_collection.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.chartPage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('singleChart', FlowRouter.getParam('slug'));
  });
});

Template.chartPage.helpers({
  chart: () => Charts.findOne({}),
  ifHas: (str) => str !== undefined ? str : 'N/A',
  ifIs: (boo) => boo ? 'Yes' : 'No',
  plusOne: (i) => i + 1
});
