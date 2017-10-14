import './show_page.html';
import Shows from '../../../api/shows/shows_collection.js';
import Playlists from '../../../api/playlists/playlists_collection.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { moment } from 'meteor/momentjs:moment';

Template.showPage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var slug = FlowRouter.getParam('slug');
    self.subscribe('singleShow', slug, {
      onReady: function() {
        var show = Shows.findOne({ slug: slug });
        Session.set('documentTitle', show.showName);
        self.subscribe('showPlaylists', show.showId);
        self.subscribe('comments', show._id);
        self.subscribe('showHostUserName', show.userId);
      }
    });
  });
});

Template.showPage.helpers({
  show: function() {
    return Shows.findOne({ slug: FlowRouter.getParam('slug') });
  },
  lessThanTen: function (n) {
    return Math.abs(n) < 10;
  },
  ownShow: function () {
    return Meteor.userId() && Shows.findOne() &&
           Shows.findOne().userId == Meteor.userId();
  },
  time: function (t) {
    var fmt = 'dddd, MMMM Do YYYY';
    return moment(t).format(fmt);
  },
  playlists: function() {
    return Playlists.find({}, {sort: {showDate: -1}});
  },
  slug: function() {
    return FlowRouter.getParam('slug');
  },
  profileUrl: function(id) {
    var user = Meteor.users.findOne({ _id: id });
    return '/profile/' + user.username;
  },
  isPlaying: function(mp3) {
    return Session.get('nowLoaded') == mp3
           && Session.get('paused') === false;
  },
  day: function(num) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[num];
  },
  timeBeautify: (startHour, startMinute, endHour, endMinute) =>
    moment(startHour + ":" + startMinute, "HH:mm").format("h:mm") + "-" +
    moment(endHour + ":" + endMinute, "HH:mm").format("h:mm A"),
  genreString: (genres) => genres.join(', ')
});

Template.showPage.events({
  'click .show__play-btn': function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    var mp3Url = $(event.currentTarget).data('path');
    var nowLoaded = Session.get('nowLoaded');

    if (nowLoaded != mp3Url) {
      var show = Shows.findOne({ slug: FlowRouter.getParam('slug') });
      $('.mejs__time-slider').css('visibility', 'visible');
      $('.mejs__broadcast').css('visibility', 'hidden');
      player.setSrc(mp3Url);
      var message = 'Now playing the latest episode of ' + show.showName;
      Session.set('defaultLoaded', false);
      Session.set('nowLoaded', mp3Url);
      Bert.alert(message, 'default', 'growl-top-right', 'fa-music');
    }

    if (player.paused) {
      player.play();
    }
    else if (!player.paused) {
      player.pause();
    }
  }
});
