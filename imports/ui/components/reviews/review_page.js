import './review_page.html';
import Reviews from '../../../api/reviews/reviews_collection.js';
import Profiles from '../../../api/users/profiles_collection.js';
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
        if (obj) {
          var artist = obj.artist, name = obj.releaseName, year = obj.year;
          Session.set('documentTitle', 'KTUH FM Honolulu | ' + artist + " - " + name + " (" + year + ")");
        }
        self.subscribe('profileDataByUsername', obj.author);
      }
    });
  });
});

Template.reviewPage.helpers({
  review: () => Reviews.findOne({ slug: FlowRouter.getParam('slug') }),
  formattedRating: (rating) => rating % 1 === .5 ? rating : Number(rating).toString() + '.0',
  displayName: () => Profiles.findOne({}).name
});
