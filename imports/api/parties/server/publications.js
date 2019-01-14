import { Meteor } from 'meteor/meteor';
import Parties from '../parties_collection.js';
import { getLocalTime } from '../../../startup/lib/helpers.js';
import { check } from 'meteor/check';

Meteor.publish('approvedParties', function () {
  return Parties.find({ approved: true,
    endTime: { $gt: getLocalTime().toDate() } });
});

Meteor.publish('singleParty', function (selector) {
  check(selector, String);
  var parties = Parties.find({ slug: selector });
  if (parties.count() > 0)
    return parties;
  else
    return Parties.find({ _id: selector });
});
