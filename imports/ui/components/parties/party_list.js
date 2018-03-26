import './party_list.html';
import './party_item.js';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import Parties from '../../../api/parties/parties_collection.js';

Template.partyList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('approvedParties');
  });
});

Template.partyList.onRendered(function () {
  Session.set('documentTitle', 'KTUH Honolulu | Radio For The People');
});

Template.partyList.helpers({
  parties: () => Parties.find({})
});
