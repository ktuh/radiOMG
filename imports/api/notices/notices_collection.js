import { Mongo } from 'meteor/mongo';
import { scorpius } from 'meteor/scorpiusjs:core';
import NoticesSchema from './notices_schema.js';

export default Notices = new scorpius.collection("notices", {
  singularName: 'notice',
  pluralName: 'notices',
  link: {
    title: 'Notices'
  },
  tabular: {
    columns: [
      {
        data: "severity",
        title: "Severity"
      },
      {
        data: "startDatetime",
        title: "Start Time"
      },

      {
        data: "endDatetime",
        title: "End Time"
      },
      scorpius.attributeColumn('createdAt', 'submitted', 'Timestamp')
    ]
  }
});

Notices.allow({
  insert: function (userId, doc) {
    return Roles.userHasRole(userId, "admin");
  },
  update: function (userId, doc, fields, modifier) {
    return Roles.userHasRole(userId, "admin");
  },
  remove: function (userId, doc) {
    return Roles.userHasRole(userId, "admin");
  }
});

Notices.attachSchema(NoticesSchema);
