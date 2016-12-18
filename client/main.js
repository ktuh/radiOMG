import '/imports/startup/client';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';

var IGNORE_CONNECTION_ISSUE_KEY = 'ignoreConnectionIssue';
var CONNECTION_ISSUE_TIMEOUT = 5000;

Session.setDefault(IGNORE_CONNECTION_ISSUE_KEY, true);

// Global audio player because it causes stack overflow when wrapped into a
// session variable.
player = null;

Session.set('hashesOpen', false);
Session.set('isSearching', false);
Session.set('numTags', 10);
Session.set('documentTitle', '808mix');
Session.set('defaultLoaded', true);
Session.set('mouseIsOverTag', false);

Bert.defaults.hideDelay = 6000;
Bert.icons['now-playing'] = 'fa-music';
Meteor.startup(function () {
  // Only show the connection error box if it has been 5 seconds since
  // the app started
  setTimeout(function () {
    // Allow the connection error box to be shown if there is an issue
    Session.set(IGNORE_CONNECTION_ISSUE_KEY, false);
  }, CONNECTION_ISSUE_TIMEOUT);
});

AutoForm.addHooks(['partyForm'],{
  onSuccess: function(formType, result) {
    console.log("Successfully submitted partyForm!\nthis.docId = " + this.docId);
    FlowRouter.go('/party/' + this.docId);
  }
});
