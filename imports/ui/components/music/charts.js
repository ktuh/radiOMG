import './charts.html';
import { Template } from 'meteor/templating';
import { Posts } from '../../../api/posts/posts_collection.js';
import { pagination } from 'meteor/kurounin:pagination';

Template.charts.onCreated(function() {
  var self = this;
  self.pagination = new Meteor.Pagination(Posts, {sort: {submitted: -1}, filter: {isChart: true}});
  self.subscribe('posts');
});

Template.charts.helpers({
  ready: () => Template.instance().pagination.ready(),
  tempPag: () => Template.instance().pagination,
  docs: () => Template.instance().pagination.getPage()
});
