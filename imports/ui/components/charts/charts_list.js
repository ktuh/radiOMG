import './charts_list.html';
import { Template } from 'meteor/templating';
import Charts from '../../../api/charts/charts_collection.js';

Template.chartList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('chartsLimited', { limit: 5, sort: { createdAt: -1 } });
  });
});

Template.chartList.helpers({
  latestChart: () => Charts.findOne({}, { sort: { createdAt: -1 } }),
  otherCharts: () => Charts.find({}, { skip: 1 }),
  ifHas: (str) => { if (str !== undefined) return str; else return 'N/A'; },
  plusOne: (i) => i + 1
});
