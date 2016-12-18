import './party_create.html';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Parties } from '../../../api/parties/parties_collection.js';

Template.partyCreate.onRendered(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('parties');
  });
});

Template.partyCreate.helpers({
	parties: function() {
		return Parties;
	}
});
