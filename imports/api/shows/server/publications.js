import { Meteor } from 'meteor/meteor';
import Shows from '../shows_collection.js'

Meteor.publish('shows', () => {
  return Shows.find({});
});

Meteor.publish('singleShow', (slug) => {
  check(slug, String);
  return Shows.find({ slug: slug });
});

Meteor.publish('showBySpinitronId', (showId) => {
  check(showId, Number);
  return Shows.find({ showId: showId });
});

Meteor.publish('activeShows', () => {
  return Shows.find({ active: true });
});

Meteor.publish('showHostUserName', (id) => {
  check(id, String);
  return Meteor.users.find({ _id: id });
});

Meteor.publish('showByUserId', (id) => {
  check(id, String);
  return Shows.find({ userId: id, active: true });
});

Meteor.publish('showNowPlaying', () => {
  var d = new Date();
  var day = d.getDay();
  var hour = d.getHours();
  var minute = d.getMinutes();
  // We are making a big assumption here! The assumption is that shows
  // do not air over midnight into the next day. Shows are to be cut off
  // at 11:59 and air entirely on a single day.
  var shows = Shows.find({ active: true,
                           startDay: { $gte: day },
                           startHour: { $gte: hour},
                           startMinute: { $gte: minute },
                           endDay: { $lte: day },
                           endHour: { $lte: hour},
                           endMinute: { $lte: minute }},
                         { sort: { startDay: 1, startHour: 1, startMinute: 1,
                                   endDay: -1, endHour: -1, endMinute: -1 },
                           limit: 1});
  return shows;
  // For testing purposes:
  // return Shows.find({}, {limit: 1});
});
