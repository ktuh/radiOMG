import './review_page.html';
import Reviews from '../../../api/reviews/reviews_collection.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.reviewPage.onCreated(function() {
  var self = this;

  self.autorun(function(){
    var slug = FlowRouter.getParam('slug');
    self.subscribe('singleReview', slug, {
      onReady: function() {
        var obj = Reviews.findOne({slug: slug});
        var artist = obj.artist, name = obj.releaseName, year = obj.year;
        Session.set('documentTitle', 'KTUH FM Honolulu | ' + artist + " - " + name + " (" + year + ")");
      }
    });
  });
});

Template.reviewPage.helpers({
  review: () => {
    var slug = FlowRouter.getParam('slug');
    return Reviews.findOne({ slug: slug });
  },
  formattedRating: (rating) => rating % 1 === .5 ? rating : Number(rating).toString() + '.0'
});
