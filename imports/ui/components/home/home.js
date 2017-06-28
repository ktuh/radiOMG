import './home.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Playlists } from '../../../api/playlists/playlists_collection.js';
import { Posts } from '../../../api/posts/posts_collection.js';
import { Reviews } from '../../../api/reviews/reviews_collection.js';
import { $ } from 'meteor/jquery';

Template.home.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('postsLimited', { limit: 5, sort: { submitted: -1 }});
    self.subscribe('reviews', { limit: 5, sort: { submitted: -1 }});
    self.subscribe('playlistsLimited', { limit: 10, sort: { showDate: -1 }});
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

    if (window.innerHeight < offset) {
        myNavBar.remove();
    }
    else if (window.innerHeight >= offset){
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
  window.onscroll = null;
});

Template.home.helpers({
  hasPosts: () => {
    return Posts.find({}, { sort: { submitted: -1 }}).count() > 0;
  },
  posts: () => {
    return Posts.find({}, { sort: { submitted: -1 }});
  },
  hasPlaylists: () => {
    return Playlists.find({}, { sort: { showDate: -1 }}).count() > 0;
  },
  playlists: () => {
    return Playlists.find({}, { sort: { showDate: -1 }});
  },
  hasReviews: () => {
    return Reviews.find({}, { sort: { submitted: -1 }}).count() > 0;
  },
  reviews: () => {
    return Reviews.find({}, { sort: { submitted: -1 }});
  }
});
