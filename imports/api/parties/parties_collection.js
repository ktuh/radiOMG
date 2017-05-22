import { Mongo } from 'meteor/mongo';
import { scorpius } from 'meteor/scorpiusjs:core';

import { PartySchema } from './parties_schema.js';

export const Parties = new scorpius.collection('parties', {
  singularName: 'party',
  pluralName: 'parties',
  tabular: {
    columns: [
      {
        data: 'flyerFront',
        title: 'Flyer',
        render: function (val, type, doc) {
          return "<img src=" + val.url + ">";
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
    return (userId && doc.userId === userId);
  },
  update: function (userId, doc, fields, modifier) {
    return doc.userId === userId;
  },
  remove: function (userId, doc) {
    return doc.userId === userId;
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
