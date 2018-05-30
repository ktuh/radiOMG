import './party_update.html';
import Parties from '../../../api/parties/parties_collection.js';

ReactiveTemplates.set('collections.parties.update', 'partiesUpdate');

Template.postsUpdate.onCreated(function (){
  var self = this;
  self.subscribe('singleParty',
    location.href.substring(location.href.lastIndexOf('/') + 1));
});

Template.partiesUpdate.helpers({
  collection: () => Parties,
  isMod: () => Meteor.user().hasRole('moderator'),
  item: () => Parties.findOne()
});

Template.partiesUpdate.events({
  'click .save-btn': function () {
    $('#updatePartyForm').submit();
  }
});

AutoForm.addHooks('updatePartyForm', {
  onSuccess: function() {
    RouterLayer.go(this.collection.indexPath());
  }
});
