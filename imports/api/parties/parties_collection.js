import { scorpius } from 'meteor/scorpiusjs:core';

import PartySchema from './parties_schema.js';

var Parties = new scorpius.collection('parties', {
  singularName: 'party',
  pluralName: 'parties',
  tabular: {
    columns: [
      {
        data: 'flyerFront',
        title: 'Flyer',
        render: function (val) {
          return '<img src=' + val.url + '>';
        }
      }, {
        data: 'title',
        title: 'Title'
      }, {
        data: 'startTime',
        title: 'Start Time'
      }, {
        data: 'location',
        title: 'Location'
      }
    ]
  }
});

Parties.allow({
  insert: function (userId, doc) {
    return (userId && doc.userId === userId) ||
      Meteor.user().hasRole('moderator');
  },
  update: function (userId, doc) {
    return doc.userId === userId ||
      Meteor.user().hasRole('moderator');
  },
  remove: function (userId, doc) {
    return doc.userId === userId ||
      Meteor.user().hasRole('moderator');
  },
  fetch: ['userId']
});

Parties.friendlySlugs({
  slugFrom: 'title',
  slugField: 'slug',
  distinct: true,
  updateSlug: false
});

Parties.attachSchema(PartySchema);

export default Parties;
