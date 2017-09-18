import './charts.html';
import { Template } from 'meteor/templating';
import { Charts } from '../../../api/charts/charts_collection.js';

Template.musicCharts.onCreated(function() {
  var self = this;
  self.pagination = new Meteor.Pagination(Charts, {sort: {createdAt: -1}, perPage: 7});
});

Template.musicCharts.helpers({
  ready: () => Template.instance().pagination.ready(),
  tempPag: () => Template.instance().pagination,
  docs: () => Template.instance().pagination.getPage()
});
