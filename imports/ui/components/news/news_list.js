import './news_list.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import Posts from '../../../api/posts/posts_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import Reviews from '../../../api/reviews/reviews_collection.js';
import Profiles from '../../../api/users/profiles_collection.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $, jQuery } from 'meteor/jquery';

Template.newsList.onCreated(function () {
  var self = this;
  self.subscribe('nextOnAir');
  self.subscribe('latestFeaturedPost', function() {
    var latestFeaturedPost = Posts.findOne();
    self.pagination = new Meteor.Pagination(Posts, {
      filters: { _id: { $ne: latestFeaturedPost._id }, approved: true },
      sort: { submitted: -1 },
      perPage: 4
    });
  });
  self.subscribe('posts', function() {
    // This subscription is actually an incremental one. See kurounin:pagination
    // docs for more information.
    self.subscribe('profileNamesById', Posts.find({ }).fetch().map((p) => p.userId));
  });
  self.subscribe('reviewsLimited', { limit: 6, sort: { submitted: -1 }});
});

Template.newsList.onRendered(function () {
  Session.set('documentTitle', 'KTUH Honolulu | Radio For The People');
});

Template.newsList.helpers({
  newsPagePath: (slug) => FlowRouter.path('radioblog/:slug', { slug: slug }),
  excerpt: (body) => $(jQuery.parseHTML(body.replace(/></g, '> <'))).text().replace(/(([^\s]+\s\s*){60})(.*)/,"$1…"),
  posts: () => Template.instance().pagination.getPage(),
  templatePagination: () => Template.instance().pagination,
  nextOnAir: () => Shows.find({}).fetch(),
  getStartEndTime: (startHour, startMinute, endHour, endMinute) =>
    moment(startHour + ":" + startMinute, "HH:mm").format("h:mm") + "-" +
    moment(endHour + ":" + endMinute, "HH:mm").format("h:mm A"),
  featuredPost: () => Posts.findOne({ approved: true, featured: true },
                                    { sort: { submitted: -1 }, limit: 1 }),
  reviews: () => Reviews.find({}, {sort: {submitted: -1}})
});
