import { Meteor } from 'meteor/meteor';
import Notices from '../notices_collection.js'

Meteor.publish("notices", function() {
  var now = new Date();
  return Notices.find({
    startDatetime: { $lt: now },
    endDatetime: { $gt: now }
  }, { sort: { severity: -1, endDatetime: 1 }, limit: 1 });
});
