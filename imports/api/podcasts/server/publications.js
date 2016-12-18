import { Meteor } from 'meteor/meteor';
import { Podcasts } from '../podcasts_collection.js';

Meteor.publish('podcasts', function (options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Podcasts.find({}, options);
});

Meteor.publish('podcast', function (epNum) {
  check(epNum, String);
  return Podcasts.find({ episodeNumber: Number(epNum) });
});

Meteor.publish('latestPodcast', function () {
  return Podcasts.find({}, { sort: {episodeNumber: -1}, limit: 1 });
});

Meteor.publish('singleDjsPodcasts', function (userId) {
  check(userId, String);
  return Podcasts.find({ userId: userId });
});

Meteor.publish('tags', function () {
  return Podcasts.find({}, { fields: {tags: 1} });
});