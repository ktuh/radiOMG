import './show_item.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import Shows from '../../../api/shows/shows_collection.js';
import { moment } from 'meteor/momentjs:moment';

Template.showItem.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('djs');
  });
});

Template.showItem.helpers({
  formattedTime: (startHour, startMinute, endHour, endMinute) => {
    if (startMinute === 1) {
      startMinute--;
    }
    if (endMinute === 59) {
      endHour = (endHour + 1) % 24;
      endMinute = 0;
    }
    var amPm = startHour > endHour;
    if (amPm) amPm = 'hA';
    else amPm = 'h';
    let time = moment(startHour + ':' + startMinute, 'HH:m').format(amPm)
      .replace('M', '') + '-' + moment(endHour + ':' + endMinute,
      'HH:mm').format('hA');
    return time.substr(0, time.length-1)
  },
  profileLink: (id) => {
    var user = Meteor.users.findOne({ _id: id });
    if (user !== undefined)
      return '/profile/' + user.username;
  },
  genreString: (genres) => genres.join(', ')
});
