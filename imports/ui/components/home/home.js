import './home.html';
import './landing.js';
import '../includes/support.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Posts from '../../../api/posts/posts_collection.js';
import Profiles from '../../../api/users/profiles_collection.js';
import Reviews from '../../../api/reviews/reviews_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { $, jQuery } from 'meteor/jquery';
import { moment } from 'meteor/momentjs:moment';
import { nextShow } from '../../../startup/lib/helpers.js';

Template.home.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('latestFeaturedPost');
    self.subscribe('postsLimited', { limit: 6, sort: { submitted: -1 }});
    self.subscribe('reviewsLimited', { limit: 6, sort: { submitted: -1 }});
    self.subscribe('latestSevenWriters');
    self.subscribe('latestSevenWritersUsernames');
    self.subscribe('nextOnAir', {
      onReady: function() {
        var show = nextShow();
        var userId = show.userId;
        self.subscribe('profileData', userId);
        self.subscribe('userById', userId);
      }
    });
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
  posts: () => Posts.find({ featured: false }, { sort: { submitted: -1 }}),
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
      var match = regex.exec($(jQuery.parseHTML(body.replace(/></g, '> <'))).text());
      return match + "…";
    }
  },
  nextShow: () => nextShow(),
  startEndTime: (startHour, startMinute, endHour, endMinute) => {
    if (startMinute === 1) {
      startMinute--;
    }
    if (endMinute === 59) {
      endHour = (endHour + 1) % 24;
      endMinute = 0;
    }
    return moment(startHour + ":" + startMinute, "HH:mm").format(startHour > endHour ? "h:mm A" : "h:mm") + "-" +
    moment(endHour + ":" + endMinute, "HH:mm").format("h:mm A"); },
  hasDjotm: () => scorpius.dictionary.get('mainPage.monthlyDJName') !== undefined,
  djName: () => scorpius.dictionary.get('mainPage.monthlyDJName', ''),
  djImg: () => scorpius.dictionary.get('mainPage.monthlyDJImgUrl', ''),
  djBlurb: () => scorpius.dictionary.get('mainPage.monthlyDJBlurb', ''),
  djLink: () => scorpius.dictionary.get('mainPage.monthlyDJLink', '')
});
