import './show_page.html';
import { Shows } from '../../../api/shows/shows_collection.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.showPage.onCreated(function() {
	var self = this;

	self.autorun(function(){
		var slug = FlowRouter.getParam('slug');
		self.subscribe('shows', {
			onReady: function() {
				var obj = Shows.findOne({slug: slug});
			  Session.set('documentTitle', obj.showName);
			}
		});
	});
});

Template.showPage.helpers({
  show: function() {
    return Shows.findOne({slug: FlowRouter.getParam("slug") });
  },
	lessThanTen: function (n) {
		return Math.abs(n) < 10;
	}
});
