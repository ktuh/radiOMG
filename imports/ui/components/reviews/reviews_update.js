import './reviews_update.html';
import { Reviews } from '../../../api/reviews/reviews_collection.js';

ReactiveTemplates.set('collections.reviews.update', 'reviewsUpdate');

Template.postsUpdate.onCreated(function (){
  var self = this;
  self.subscribe('singleReview', location.href.substring(location.href.lastIndexOf('/') + 1));
});

Template.postsUpdate.helpers({
  collection: () => Reviews,
  isMod: () => Meteor.user().hasRole("moderator")
});
