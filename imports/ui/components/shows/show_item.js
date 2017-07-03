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
    return hour + ':' + minute + period;
  },
  profileLink: (id) => {
    var user = Meteor.users.findOne({ _id: id });
    if (user !== undefined)
      return "/profile/" + user.username;
  },
  genreString: (genres) => {
    var str = '';
    for (var i = 0; i < genres.length; i++) {
      str = str + genres[i];
      if (i !== genres.length - 1) 
        str = str + ', ';
    }
    return str;
  }
});
