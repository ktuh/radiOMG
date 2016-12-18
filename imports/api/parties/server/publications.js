import { Meteor } from 'meteor/meteor';
import { Parties } from '../parties_collection.js';

Meteor.publish('parties', function () {
  return Parties.find();
});

Meteor.publish('singleParty', function (selector) {
  check(selector, String);
  var parties = Parties.find({ slug: selector });
  if (parties.count() > 0)
    return parties;
  else
    return Parties.find({ _id: selector });
});
