import { Meteor } from 'meteor/meteor';
import Notices from '../notices_collection.js'
import { getLocalTime } from '../../../startup/lib/helpers.js';

Meteor.publish('notices', function() {
  var now = getLocalTime().toDate();
  return Notices.find({
    startDatetime: { $lt: now },
    endDatetime: { $gt: now }
  }, { sort: { severity: -1, endDatetime: 1 }, limit: 1 });
});
