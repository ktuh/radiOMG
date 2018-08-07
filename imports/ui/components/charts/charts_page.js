import './charts_page.html';
import { Template } from 'meteor/templating';
import Charts from '../../../api/charts/charts_collection.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';

Template.chartPage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('singleChart', FlowRouter.getParam('slug'));
  });
});

Template.chartPage.helpers({
  chart: () => Charts.findOne({}),
  dateFmt: (date) => momentUtil(
    moment(date, 'Pacific/Honolulu')).format('MMMM DD, YYYY'),
  ifHas: (str) => { if (str !== undefined) return str; else return 'N/A'; },
  ifIs: (boo) => { if (boo) return 'Yes'; else return 'No'; },
  plusOne: (i) => i + 1
});
