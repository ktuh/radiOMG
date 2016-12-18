import './party_list.html';
import './party_item.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Parties } from '../../../api/parties/parties_collection.js';
import { $ } from 'meteor/jquery';

Template.partyList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('parties');
  });
});

Template.partyList.onRendered(function () {
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

Template.partyList.helpers({
  newPartyUrl: () => FlowRouter.path('partyCreate'),
  parties: () => Parties.find()
});
