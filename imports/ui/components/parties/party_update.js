import './party_update.html';
import { Parties } from '../../../api/parties/parties_collection.js';

ReactiveTemplates.set('collections.parties.update', 'partiesUpdate');

Template.postsUpdate.onCreated(function (){
  var self = this;
  self.subscribe('singleParty', location.href.substring(location.href.lastIndexOf('/') + 1));
});

Template.postsUpdate.helpers({
  collection: () => Parties,
  isMod: () => Meteor.user().hasRole("moderator")
});
