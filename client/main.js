import '../imports/startup/client';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Profiles from '../imports/api/users/profiles_collection.js';
import { throwError } from './helpers/errors.js';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

var IGNORE_CONNECTION_ISSUE_KEY = 'ignoreConnectionIssue';
var CONNECTION_ISSUE_TIMEOUT = 5000;

Session.setDefault(IGNORE_CONNECTION_ISSUE_KEY, true);

// Global audio player because it causes stack overflow when wrapped into a
// session variable.
player = null;

Session.set('hashesOpen', false);
Session.set('isSearching', false);
Session.set('numTags', 10);
Session.set('documentTitle', 'KTUH FM Honolulu | Radio For The People');
Session.set('defaultLoaded', true);
Session.set('mouseIsOverTag', false);
Session.set('playedStream', false);

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
  onSuccess: function() {
    FlowRouter.go('/event' + this.docId);
  }
});

Meteor.subscribe('bannedProfiles');

Tracker.autorun(() => {
  if (Meteor.loggingIn() || Meteor.user()) {
    var profile = Profiles.findOne({ userId: Meteor.userId() });
    if (profile && profile.banned) {
      throwError('Login denied. This account is currently disabled.');
      Meteor.logout();
    }
  }

  if (FlowRouter._current.path !== undefined) {
    if (FlowRouter._current.path.startsWith('/admin') &&
      $('head link[href="https://cdnjs.cloudflare.com/ajax/libs/' +
      'materialize/1.0.0/css/materialize.min.css"], ' +
      'head script[src="https://cdnjs.cloudflare.com/ajax/libs/materialize' +
        '/1.0.0/js/materialize.min.js"]').length === 0) {
      $('head').append(
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/' +
        'materialize/1.0.0/css/materialize.min.css">' +
        '<script src="https://cdnjs' +
        '.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js">' +
        '</script>');
      $('#react-root').remove();
    }
    else if (!FlowRouter._current.path.startsWith('/admin') &&
      $('head link[href="https://cdnjs.cloudflare.com/ajax/libs/' +
      'materialize/1.0.0/css/materialize.min.css"], ' +
      'head script[src="https://cdnjs.cloudflare.com/ajax/libs/materialize' +
        '/1.0.0/js/materialize.min.js"]').length > 0) {
      $('head link[href="https://cdnjs.cloudflare.com/ajax/libs/' +
      'materialize/1.0.0/css/materialize.min.css"], ' +
      'head script[src="https://cdnjs.cloudflare.com/ajax/libs/materialize' +
        '/1.0.0/js/materialize.min.js"], #__blaze-root').remove();
    }
  }
});
