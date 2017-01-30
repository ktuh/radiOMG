import './show_create.html';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Shows } from '../../../api/shows/shows_collection.js';

Template.showCreate.onRendered(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('shows');
  });
});

Template.showCreate.helpers({
	shows: function() {
		return Shows;
	}
});
