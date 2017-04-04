import './show_page.html';
import { Shows } from '../../../api/shows/shows_collection.js';
import { Playlists } from '../../../api/playlists/playlists_collection.js';
import { Comments } from '../../../api/comments/comments_collection.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.showPage.onCreated(function() {
  var self = this;
  self.autorun(function(){
    var slug = FlowRouter.getParam('slug');
    self.subscribe('shows');
    self.subscribe('playlists');
  });
});

Template.showPage.helpers({
  show: function() {
    return Shows.findOne({slug: FlowRouter.getParam("slug") });
  },
  lessThanTen: function (n) {
  return Math.abs(n) < 10;
  },
  ownShow: function () {
    return Meteor.userId() && Shows.findOne() &&
           Shows.findOne().userId == Meteor.userId();
  },
  comments: function () {
    return Comments.find();
  },
  time: function (t) {
    var fmt = "dddd, MMMM Do YYYY, h:mm a"
    return moment(t).format(fmt);
  },
  slug: function () {
    return FlowRouter.getParam('slug');
  },
  upvoted: function(upvoters) {
    var username = Meteor.user().username;
    var a = upvoters || [];
    var i = a.indexOf(username);
    var r = '';

    if (i >= 0) {
      r = 'upvoted';
    };

    return r;
  },
  upvoters: function() {
    return Shows.findOne({slug: FlowRouter.getParam('slug')}).upvoters;
  },
  playlists: function() {
    return Playlists.find({showId: Shows.findOne({slug: FlowRouter.getParam('slug')}).showId });
  }
});
