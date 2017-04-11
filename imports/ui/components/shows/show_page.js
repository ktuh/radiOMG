import './show_page.html';
import { Shows } from '../../../api/shows/shows_collection.js';
import { Playlists } from '../../../api/playlists/playlists_collection.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';


Template.showPage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var slug = FlowRouter.getParam('slug');
    self.subscribe('singleShow', slug, {
      onReady: function() {
        var show = Shows.findOne({ slug: slug });
        Session.set('documentTitle', show.showName);
        self.subscribe('showPlaylists', show._id);
        self.subscribe('comments', show._id);
      }
    });
  });
});

Template.showPage.helpers({
  show: function() {
    return Shows.findOne({ slug: FlowRouter.getParam("slug") });
  },
  lessThanTen: function (n) {
  return Math.abs(n) < 10;
  },
  ownShow: function () {
    return Meteor.userId() && Shows.findOne() &&
           Shows.findOne().userId == Meteor.userId();
  },
  time: function (t) {
    var fmt = "dddd, MMMM Do YYYY, h:mm a"
    return moment(t).format(fmt);
  },
  playlists: function() {
    return Playlists.find();
  },
  slug: function() {
    return FlowRouter.getParam("slug");
  }
});
