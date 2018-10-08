import './charts_sidebar.html';
import { Template } from 'meteor/templating';
import Charts from '../../../api/charts/charts_collection.js';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';
import 'meteor/kurounin:pagination';

Template.chartsSidebar.onCreated(function() {
  var self = this;
  self.pagination = new Meteor.Pagination(Charts, { sort:
    { chartDate: -1, title: 1 }, perPage: 6 });
});

Template.chartsSidebar.helpers({
  dateFmt: (date) => momentUtil(
    moment(date, 'Pacific/Honolulu')).format('MMMM DD, YYYY'),
  isReady: () => Template.instance().pagination.ready(),
  templatePagination: () => Template.instance().pagination,
  charts: () => Template.instance().pagination.getPage(),
});
