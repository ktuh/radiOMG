import './pages_item.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Pages } from '../../../api/pages/pages_collection.js';

Template.newsItem.onCreated(function () {
  var self = this;
  self.autorun(function () {
    var slug = FlowRouter.getParam('slug');
    self.subscribe('singlePage', slug, {
      onReady: function () {
        var page = Pages.findOne({ slug: slug });

        // Dirty solution, should be handled in the router but we don't have a
        // data control layer/controller there, so we redirect in the template.
        if (slug === undefined) {
          BlazeLayout.render('layout', {content: 'notFound'});
        }
      });
  });
});

Template.newsItem.helpers({
  page: function () {
    return Pages.findOne();
  }
});
