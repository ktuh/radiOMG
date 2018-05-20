import { Meteor } from 'meteor/meteor';
import Parties from '../parties_collection.js';
import { moment } from 'meteor/momentjs:moment';

Meteor.publish('approvedParties', function () {
  return Parties.find({ approved: true,
    endTime: { $gt: moment.utc().utcOffset("-10:00").toDate() } });
});

Meteor.publish('singleParty', function (selector) {
  check(selector, String);
  var parties = Parties.find({ slug: selector });
  if (parties.count() > 0)
    return parties;
  else
    return Parties.find({ _id: selector });
});
