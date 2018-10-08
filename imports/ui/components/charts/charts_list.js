import './charts_list.html';
import './charts_sidebar.js';
import { Template } from 'meteor/templating';
import Charts from '../../../api/charts/charts_collection.js';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';

Template.chartList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('chartsLimited',
      { limit: 5, sort: { chartDate: -1, title: 1 } });
  });
});

Template.chartList.helpers({
  latestChart: () => Charts.findOne({}, { sort: { chartDate: -1, title: 1 } }),
  latestCharts:
    () => Charts.find({}, { limit: 2, sort: { chartDate: -1, title: 1 } }),
  dateFmt: (date) => momentUtil(
    moment(date, 'Pacific/Honolulu')).format('MMMM DD, YYYY'),
  ifHas: (str) => { if (str !== undefined) return str; else return 'N/A'; },
  plusOne: (i) => i + 1
});
