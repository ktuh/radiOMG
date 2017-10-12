import './pages_item.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Pages } from '../../../api/pages/pages_collection.js';

Template.pagesItem.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var slug = FlowRouter.getParam('slug');
    self.subscribe('singlePage', slug, {
      onReady: function () {
        var page = Pages.findOne({ slug: slug });
        Session.set('documentTitle', page.title);
      }
    });
  });
});

Template.pagesItem.helpers({
  page: function() {
    var slug = FlowRouter.getParam('slug');
    return Pages.findOne({slug: slug});
  }
});
