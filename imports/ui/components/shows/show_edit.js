import './show_edit.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Shows } from '../../../api/shows/shows_collection.js';

Template.showEdit.onRendered(function() {
  var self = this;

  self.autorun(function () {
    var slug = FlowRouter.getParam('slug');

    self.subscribe('singleShow', slug, {
      onReady: function () {
        var post = Shows.findOne();
        self.subscribe('comments', post._id);
      }
    });
  });
});


Template.showEdit.helpers({
  shows: function() {
    return Shows;
  },
  editing: function() {
    return Shows.findOne({slug: FlowRouter.getParam('slug')});
  }
});
