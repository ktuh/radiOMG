import { scorpius } from 'meteor/scorpiusjs:core';
import NoticesSchema from './notices_schema.js';
import { Roles } from 'meteor/nicolaslopezj:roles';

var Notices = new scorpius.collection('notices', {
  singularName: 'notice',
  pluralName: 'notices',
  link: {
    title: 'Notices'
  },
  tabular: {
    columns: [
      {
        data: 'severity',
        title: 'Severity'
      },
      {
        data: 'startDatetime',
        title: 'Start Time'
      },

      {
        data: 'endDatetime',
        title: 'End Time'
      },
      scorpius.attributeColumn('createdAt', 'submitted', 'Timestamp')
    ]
  }
});

Notices.allow({
  insert: function (userId) {
    return Roles.userHasRole(userId, 'admin');
  },
  update: function (userId) {
    return Roles.userHasRole(userId, 'admin');
  },
  remove: function (userId) {
    return Roles.userHasRole(userId, 'admin');
  }
});

Notices.attachSchema(NoticesSchema);

export default Notices;
