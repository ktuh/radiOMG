import './show_schedule.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Mongo } from 'meteor/mongo';
import { Shows } from '../../../api/shows/shows_collection.js';
import { $ } from 'meteor/jquery';

Template.showSchedule.onRendered(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('shows');
	});
});

Template.showSchedule.helpers({
	dayOfTheWeek: function() {
			var daze = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			return daze[new Date().getDay()];
	},
  showList: function (day) {
		var list = $("<ul>", {class: "showList"});
		var res = Shows.find({startDay: day, active: true}, {sort: {startHour: 1, startMinute: 1}});
		res.forEach(function(show) {
			list.append("<li>" + show.startHour + ":" + (show.startMinute < 10 ? "0" + show.startMinute : show.startMinute) + "-" + show.endHour + ":" + (show.endMinute < 10 ? "0" + show.endMinute : show.endMinute) +
									": " + show.showName + " with " + show.host + "</li>");
		});
		return list.prop("outerHTML");
	}
});
