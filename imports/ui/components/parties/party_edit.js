import './party_edit.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Parties } from '../../../api/parties/parties_collection.js';

Template.partyEdit.onRendered(function() {
  var self = this;

  self.autorun(function () {
    var slug = FlowRouter.getParam('slug');

    self.subscribe('singleParty', slug, {
      onReady: function () {
        var post = Parties.findOne();
        self.subscribe('comments', post._id);
      }
    });
  });
});


Template.partyEdit.helpers({
	parties: function() {
		return Parties;
	},
	editing: function() {
		return Parties.findOne({slug: FlowRouter.getParam('slug')});
	}
});
