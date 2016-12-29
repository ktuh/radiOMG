import './profile_edit.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AutoForm } from 'meteor/aldeed:autoform';
import { UsersSchema } from '../../../api/users/users_schema.js';

Template.profileEdit.onRendered(function() {
  var self = this;
});

Template.profileEdit.helpers({
	loggedInUser: function(){
		return Meteor.users.findOne({_id: Meteor.userId()});
	}
});

Template.profileEdit.events({
	'change .file-upload': function(evt) {
		evt.preventDefault();
	 	var upload = new Slingshot.Upload("uploadImg");
		upload.send($("input[type='file']")[0].files[0], function(error, dUrl) {
			if (error) {
				console.error("Error uploading.");
			}
			else {
				console.log("Success!");
			}
		});
	}
});
