import './reviews_update.html';
import Reviews from '../../../api/reviews/reviews_collection.js';

ReactiveTemplates.set('collections.reviews.update', 'reviewsUpdate');

Template.reviewsUpdate.onCreated(function (){
  var self = this;
  self.subscribe('singleReview',
    location.href.substring(location.href.lastIndexOf('/') + 1));
});

Template.reviewsUpdate.helpers({
  collection: () => Reviews,
  isMod: () => Meteor.user().hasRole('moderator'),
  item: () => Reviews.findOne()
});

Template.reviewsUpdate.events({
  'click .save-btn': function () {
    $('#updateReviewForm').submit();
  }
});

AutoForm.addHooks('updateReviewForm', {
  onSuccess: function() {
    RouterLayer.go(this.collection.indexPath());
  }
});
