import './home.html';
import '../includes/support.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Posts from '../../../api/posts/posts_collection.js';
import Profiles from '../../../api/users/profiles_collection.js';
import Reviews from '../../../api/reviews/reviews_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { $ } from 'meteor/jquery';
import { moment } from 'meteor/momentjs:moment';

Template.home.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('postsLimited', { limit: 6, sort: { submitted: -1 }});
    self.subscribe('reviewsLimited', { limit: 6, sort: { submitted: -1 }});
    self.subscribe('latestSevenWriters');
    self.subscribe('latestSevenWritersUsernames');
    self.subscribe('latestFeaturedPost');
    self.subscribe('activeShows');
  });
});

Template.home.onRendered(function() {
  /* This next section makes our sticky nav possible. */
  var myNavBar = {
    flagAdd: true,
    objs: [],
    init: function (objs) {
      this.objs = objs;
      for (var i = 0; i < this.objs.length; i++) {
        this.objs[i].addClass('fixed-theme');
      }
    },
    add : function() {
      if (this.flagAdd) {
        for (var i = 0; i < this.objs.length; i++) {
          this.objs[i].addClass('fixed-theme');
        }
        this.flagAdd = false;
      }
    },
    remove: function() {
      if (!this.flagAdd) {
        for (var i = 0; i < this.objs.length; i++) {
          this.objs[i].removeClass('fixed-theme');
        }
        this.flagAdd = true;
      }
    }
  };

  /* Init the object. Pass the object the array of elements
   * that we want to change when the scroll goes down. */
  myNavBar.init([$('.navbar'), $('.navbar-default'), $('.dropdown-menu')]);

  /* Function that manages the direction of the scroll. */
  function offSetManager() {
    var offset = window.pageYOffset + $('.navbar').height();
    var height = $('.landing').height();

    if (height < offset) {
        myNavBar.remove();
    }
    else if (height >= offset){
        myNavBar.add();
    }
  }

  /* Bind to the document scroll detection. */
  window.onscroll = function(e) {
    offSetManager();
  }

  /* We have to do a first detectation of offset because the page
   * could be load with scroll down set. */
  offSetManager();
});

Template.home.onDestroyed(function() {
  var objs = [$('.navbar'), $('.navbar-default'), $('.dropdown-menu')]
  for (var i = 0; i < objs.length; i++) {
    objs[i].removeClass('fixed-theme');
  }
  window.scroll(0, 0);
  window.onscroll = null;
});

Template.home.helpers({
  hasPosts: () => Posts.find({}, { sort: { submitted: -1 }}).count() > 0,
  posts: () => Posts.find({featured: false}, { sort: { submitted: -1 }}),
  hasReviews: () => Reviews.find({}, { sort: { submitted: -1 }}).count() > 0,
  reviews: () => Reviews.find({}, { sort: { submitted: -1 }}),
  synopsis: (body) => body.replace(/(([^\s]+\s\s*){12})(.*)/,"$1…"),
  featuredPost: () => Posts.findOne({ approved: true, featured: true },
                                 { sort: { submitted: -1 }, limit: 1 }),
  firstTag: () => {
    var featured = Posts.findOne({ approved: true, featured: true },
                  { sort: { submitted: -1 }, limit: 1 });
    return featured && featured.tags &&
           featured.tags.length > 0 && featured.tags[0];
  },
  renderSummary: (summary, body, numWords) => {
    if (summary && summary !== '') {
      return summary;
    }
    else {
      var regex = new RegExp("(([^\\s]+\\s\\s*){" + numWords + "})(.*)");
      return body.replace(regex," $1…");
    }
  },
  getDisplayNameById: (id) => Profiles.findOne({userId: id}).name,
  getUsernameById: (id) => Meteor.users.findOne({_id: id}).username,
  getNextShow: () => {
    var dows = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var currentDate = new Date(), nextDate = new Date(currentDate.getDate() + 1);
    var currentDow = currentDate.getDay(), nextDow = nextDate.getDay();
    var currentHour = currentDate.getHours(), nextHour = currentHour + (3 - currentHour % 3);
    var nextSameDayShow = Shows.findOne({ startDay: currentDow, startHour: { $gte: nextHour } }, { sort: { startDay: 1, startHour: 1 } });
    var nextNextDayShow = Shows.findOne({ startDay: nextDow }, { sort: { startDay: 1, startHour: 1 } });
    var nextShowRegardless = Shows.findOne({startDay: { $gt: nextDow + 1 % 7 } }, { sort: { startDay: 1, startHour: 1 } }) || Shows.findOne({}, { sort: { startDay: 1, startHour: 1 } });
    return nextSameDayShow || nextNextDayShow || nextShowRegardless;
  },
  getTime: (str) => moment(str).fromNow(),
  getStartEndTime: (startHour, startMinute, endHour, endMinute) =>
    moment(startHour + ":" + startMinute, "HH:mm").format("h:mm") + "-" +
    moment(endHour + ":" + endMinute, "HH:mm").format("h:mm A")
});
