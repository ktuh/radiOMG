import './reviews_create.html';
import Reviews from '../../../api/reviews/reviews_collection.js';

ReactiveTemplates.set('collections.reviews.create', 'reviewsCreate');

Template.reviewsCreate.helpers({
  collection: () => Reviews
});

Template.reviewsCreate.events({
  'click .submit-btn': function () {
    $('#insertReviewForm').submit();
  }
});

AutoForm.addHooks('insertReviewForm', {
  onSuccess: function() {
    RouterLayer.go(this.collection.indexPath());
  }
});
