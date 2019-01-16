import { Meteor } from 'meteor/meteor';
import Parties from '../imports/api/parties/parties_collection.js';
import { check } from 'meteor/check';

Meteor.methods({
  upvoteParty: function(partyId) {
    check(partyId, String);

    var p = Parties.findOne({ _id: partyId });
    var u = Meteor.user();

    if (!p) {
      throw new Meteor.Error(100003,
        'Party not found during upvote operation.');
    }

    if (p.upvoters.indexOf && p.upvoters.indexOf(u.username) >= 0) {
      Parties.update({ _id: partyId }, { $inc: { upvoteCount: -1 },
        $pull: { upvoters: u.username } });
    } else if (p.upvoters.indexOf && p.upvoters.indexOf(u.username) < 0) {
      Parties.update({ _id: partyId }, { $inc: { upvoteCount: 1 },
        $addToSet: { upvoters: u.username } });
    }
    else {
      throw new Meteor.Error(100003, 'No method \'indexOf\' of undefined.');
    }
  }
});
