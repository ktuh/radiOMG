import './shows_create.html';
import Shows from '../../../api/shows/shows_collection.js';
import 'meteor/summernote:standalone';
import { $ } from 'meteor/jquery';

ReactiveTemplates.set('collections.shows.create', 'showsCreate');

Template.showsCreate.helpers({
  collection: () => Shows
});

Template.showsCreate.events({
  'click .submit-btn': function () {
    $('#insertShowForm').submit();
  }
});

AutoForm.addHooks('insertShowForm', {
  onSuccess: function() {
    RouterLayer.go(this.collection.indexPath());
  }
});
