import './show_item.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import Shows from '../../../api/shows/shows_collection.js';
import { moment } from 'meteor/momentjs:moment';

Template.showItem.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var show = Shows.findOne();
    self.subscribe('showHostUserName', show.userId);
  });
});

Template.showItem.helpers({
  formattedTime: (startHour, startMinute, endHour, endMinute) => {
    let time = moment(startHour + ":" + startMinute, "HH:mm").format("h") + "-" +
               moment(endHour + ":" + endMinute, "HH:mm").format("hA");
    return time.substr(0, time.length-1)
  },
  profileLink: (id) => {
    var user = Meteor.users.findOne({ _id: id });
    if (user !== undefined)
      return "/profile/" + user.username;
  },
  genreString: (genres) => genres.join(', ')
});
