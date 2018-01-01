import './posts_create.html';
import Posts from '../../../api/posts/posts_collection.js';

ReactiveTemplates.set('collections.posts.create', 'postsCreate');

Template.postsCreate.helpers({
  collection: () => Posts
});

Template.postsCreate.events({
  'click .submit-btn': function () {
    $('#createPostForm').submit();
  }
});

AutoForm.addHooks('createPostForm', {
  onSuccess: function() {
    RouterLayer.go(this.collection.indexPath());
  }
});
