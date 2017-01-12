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
  calendar: function() {
		var ret = $("<table>", {class: "schedule", border: "1"});
		var header = $("<tr>", {id: "schedule-header"});
		var body = $("<tr>", {id: "schedule-body"});
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		for (var d = 0; d < days.length; d++) {
			console.log(days[d]);
			header.append("<td><h1>"+ days[d] + "</h1></td>");
			var td = $("<td>", {class: "bodyCell"});
			var list = $("<ul>", {class: "showList"});
			var res = Shows.find({startDay: days[d], active: true}, {sort: {startHour: 1, startMinute: 1}});
			res.forEach(function(show) {
				console.log(show);
				list.append("<li>" + show.startHour + ":" + (show.startMinute < 10 ? "0" + show.startMinute : show.startMinute) + "-" + show.endHour + ":" + (show.endMinute < 10 ? "0" + show.endMinute : show.endMinute) +
										": " + show.showName + " with " + show.host + "</li>");
			});
			console.log(list.prop("outerHTML"));
			td.append(list);
			body.append(td);
		}
		ret.append(header);
		ret.append(body);
		console.log(ret.prop("outerHTML"));
		return ret.prop('outerHTML');
	}
});
