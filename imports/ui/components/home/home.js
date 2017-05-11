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
    self.subscribe('posts', { limit: 5, sort: { submitted: -1 }});
    self.subscribe('reviews', { limit: 5, sort: { submitted: -1 }});
    self.subscribe('playlists', { limit: 10, sort: { showDate: -1 }});
  });
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