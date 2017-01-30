import './profile_edit.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AutoForm } from 'meteor/aldeed:autoform';
import '../../../api/users/users_collection.js';
import { UsersSchema } from '../../../api/users/users_schema.js';
import { check } from 'meteor/check';

Template.profileEdit.onRendered(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe("users");
  });
});
