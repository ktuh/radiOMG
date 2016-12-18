import './review_page.html';
import { Reviews } from '../../../api/reviews/reviews_collection.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.reviewPage.onCreated(function() {
	var self = this;

	self.autorun(function(){
		var slug = FlowRouter.getParam('slug');
		self.subscribe('singleReview', slug, {
			onReady: function() {
				var obj = Reviews.findOne({slug: slug});
				var artist = obj.artist, name = obj.releaseName, year = obj.year;
			  Session.set('documentTitle', artist + " - " + name + " (" + year + ")");
			}
		});
	});
});

Template.reviewPage.helpers({
	review: function() {
		var slug = FlowRouter.getParam('slug');
		return Reviews.findOne({ slug: slug });
	}
});
