import './show_list.html';
import './show_item.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import Shows from '../../../api/shows/shows_collection.js';
import { $ } from 'meteor/jquery';

Template.showList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('shows');
  });
});

Template.showList.helpers({
  newPartyUrl: () => FlowRouter.path('showCreate'),
  active: (d) => {
    var day = FlowRouter.getQueryParam('day');
    var daze = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var date = new Date();

    // We're not routed to a particular day of the week
    if (day === undefined || $.inArray(day, daze) === -1)
      return d === daze[date.getDay()] ? 'active' : '';
    else return d === daze[$.inArray(day, daze)] ? 'active' : '';
  },
  daysShows: () => {
    var day = FlowRouter.getQueryParam('day');
    var daze = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var date = new Date();
    var dayNum = 0;
    if (day === undefined || $.inArray(day, daze) < 0) {
      dayNum = date.getDay();
    } else { 
      dayNum = $.inArray(day, daze);
    }
    return Shows.find({startDay: dayNum}, 
                      {sort: {startHour: 1, startMinute: 1}});
  }
});

Template.showList.events({
  'click .shows__previous-day': function (event) {
    var day = FlowRouter.getQueryParam('day');
    var daze = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var date = new Date();
    var prevDayNum = 0;
    if (day === undefined || $.inArray(day, daze) < 0)
      prevDayNum = date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;
    else {
      var dayNum = $.inArray(day, daze);
      prevDayNum = dayNum - 1 < 0 ? 6 : dayNum - 1;
    }
    FlowRouter.go(FlowRouter.getRouteName(), {}, {day: daze[prevDayNum]})
  },
  'click .shows__next-day': function (event) {
    var day = FlowRouter.getQueryParam('day');
    var daze = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var date = new Date();
    var nextDayNum = 0;
    if (day === undefined || $.inArray(day, daze) < 0)
      nextDayNum = date.getDay() + 1 > 6 ? 0 : date.getDay() + 1;
    else {
      var dayNum = $.inArray(day, daze);
      nextDayNum = dayNum + 1 > 6 ? 0 : dayNum + 1;
    }
    FlowRouter.go(FlowRouter.getRouteName(), {}, {day: daze[nextDayNum]})
  }
});