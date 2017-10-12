import './review_list.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import Reviews from '../../../api/reviews/reviews_collection.js';
import './review_item.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.reviewList.onCreated(function () {
  var self = this;
  self.pagination = new Meteor.Pagination(Reviews, { sort: { showDate: -1 }, perPage: 8, filters: {approved: true}});
});

Template.reviewList.helpers({
    isReady: () => Template.instance().pagination.ready(),
    templatePagination: () => Template.instance().pagination,
    reviews: () => Template.instance().pagination.getPage()
});
