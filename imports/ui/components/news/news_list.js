import './news_list.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import Posts from '../../../api/posts/posts_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.newsList.onCreated(function () {
  var self = this;
  self.subscribe('nextOnAir');
  self.pagination = new Meteor.Pagination(Posts, { 
    sort: { showDate: -1 }, 
    perPage: 4, 
    filters: { approved: true }
  });
  self.subscribe('latestFeaturedPosts', 3);
});

Template.newsList.onRendered(function () {
  Session.set('documentTitle', 'KTUH Honolulu | Radio For The People');
});

Template.newsList.helpers({
  newsPagePath: (slug) => FlowRouter.path('news/:slug', { slug: slug }),
  excerpt: (body) => body.replace(/(([^\s]+\s\s*){100})(.*)/,"$1…"),
  posts: () => Template.instance().pagination.getPage(),
  templatePagination: () => Template.instance().pagination,
  nextOnAir: () => Shows.find({}).fetch(),
  getStartEndTime: (startHour, startMinute, endHour, endMinute) =>
    moment(startHour + ":" + startMinute, "HH:mm").format("h:mm") + "-" +
    moment(endHour + ":" + endMinute, "HH:mm").format("h:mm A"),
  featuredPosts: () => Posts.find({ approved: true, featured: true },
                                  { sort: { submitted: -1 }, limit: 3 })
});
