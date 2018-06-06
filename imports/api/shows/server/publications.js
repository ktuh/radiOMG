import { Meteor } from 'meteor/meteor';
import Shows from '../shows_collection.js';
import { getLocalTime } from '../../../startup/lib/helpers.js';

Meteor.publish('shows', () => {
  return Shows.find({});
});

Meteor.publish('singleShow', (slug) => {
  check(slug, String);
  return Shows.find({ slug: slug });
});

Meteor.publish('showById', (id) => {
  check(id, String);
  return Shows.find({ _id: id });
});

Meteor.publish('showBySpinitronId', (showId) => {
  check(showId, Number);
  return Shows.find({ showId: showId });
});

Meteor.publish('activeShows', () => Shows.find({ active: true }));

Meteor.publish('showByUserId', (id) => {
  check(id, String);
  return Shows.find({ userId: id, active: true });
});

Meteor.publish('showNowPlaying', () => {
  // We are making a big assumption here! The assumption is that shows
  // do not air over midnight into the next day. Shows are to be cut off
  // at 11:59 and air entirely on a single day.
  var now = getLocalTime();
  return Shows.find({ active: true, startDay: now.day(),
    startHour: { $lte: now.hour() },
    endDay: now.day()
  }, {
    sort: { startHour: -1 }, limit: 1
  });
});

Meteor.publish('nextOnAir', () => {
  var now = getLocalTime();
  var sameDay = Shows.find({
    active: true, startDay: now.day(),
    startHour: { $gt: now.hour() },
    endDay: now.day()
  }, {
    sort: { startDay: 1, startHour: 1, startMinute: 1 },
    limit: 3
  });
  var tmr1 = Shows.find({
    active: true,
    startDay: { $gte: (now.day() + 1) % 7 }
  }, {
    sort: { startDay: 1, startHour: 1, startMinute: 1 },
    limit: 3
  });

  var tmr2 = Shows.find({ active: true, startDay: { $gte: 0 } },
    { sort: { startDay: 1, startHour: 1, startMinute: 1 }, limit: 3 });

  if (sameDay.fetch().length > 0) return sameDay;
  else if (tmr1.fetch().length > 0) return tmr1;
  return tmr2;
});
