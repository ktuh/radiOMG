import './show_list.html';
import './show_item.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Shows } from '../../../api/shows/shows_collection.js';
import { $ } from 'meteor/jquery';

Template.showList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('shows');
  });
});

Template.showList.onRendered(function () {
  var $parties = $('.parties');

  $parties.imagesLoaded(function() {
    $parties.masonry({
      itemSelector: '.party',
      transitionDuration: 0,
      isResizeBound: true
    });
  });
  Session.set('documentTitle', '808party');
});

Template.showList.helpers({
  newPartyUrl: () => FlowRouter.path('showCreate'),
  shows: () => Shows.find()
});
