import './show_item.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Shows } from '../../../api/shows/shows_collection.js';

Template.showItem.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var show = Shows.findOne();
    self.subscribe('showHostUserName', show.userId);
  });
});

Template.showItem.helpers({
  formattedTime: (startHour, startMinute) => {
    var hour = startHour < 10 ? '0' + startHour : startHour;
    var minute = startMinute < 10 ? '0' + startMinute : startMinute;
    var period = startHour < 12 ? 'am' : 'pm';
    return (hour <= 12 ? hour : hour - 12) + ':' + minute + period;
  },
  profileLink: (id) => {
    var user = Meteor.users.findOne({ _id: id });
    if (user !== undefined)
      return "/profile/" + user.username;
  },
  genreString: (genres) => genres.join(', ')
});
