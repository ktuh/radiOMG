import './posts_update.html';
import Posts from '../../../api/posts/posts_collection.js';

ReactiveTemplates.set('collections.posts.update', 'postsUpdate');

Template.postsUpdate.onCreated(function (){
  var self = this;
  self.subscribe('singlePostById', location.href.substring(location.href.lastIndexOf('/') + 1));
});

Template.postsUpdate.helpers({
  collection: () => Posts,
  isMod: () => Meteor.user().hasRole("moderator")
});

Template.postsUpdate.events({
  'click .save-btn': function () {
    $('#updatePostForm').submit();
  }
});

AutoForm.addHooks('updatePostForm', {
  onSuccess: function() {
    RouterLayer.go(this.collection.indexPath());
  }
});
