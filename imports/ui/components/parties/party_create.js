import './party_create.html';
import Parties from '../../../api/parties/parties_collection.js';

ReactiveTemplates.set('collections.parties.create', 'partiesCreate');

Template.partiesCreate.helpers({
  collection: () => Parties
});

Template.partiesCreate.events({
  'click .submit-btn': function () {
    $('#createPartyForm').submit();
  }
});

AutoForm.addHooks('createPartyForm', {
  onSuccess: function() {
    RouterLayer.go(this.collection.indexPath());
  }
});
