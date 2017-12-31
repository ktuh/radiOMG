import './shows_update.html';
import Shows from '../../../api/shows/shows_collection.js';

ReactiveTemplates.set('collections.shows.update', 'showsUpdate');

Template.showsUpdate.onCreated(function (){
  var self = this;
  self.subscribe('showById', location.href.substring(location.href.lastIndexOf('/') + 1));
});

Template.showsUpdate.helpers({
  collection: () => Shows
});

Template.showsUpdate.events({
  'click .save-btn': function () {
    $('#updateShowForm').submit();
  }
});

AutoForm.addHooks('updateShowForm', {
  onSuccess: function() {
    RouterLayer.go(this.collection.indexPath());
  }
});
