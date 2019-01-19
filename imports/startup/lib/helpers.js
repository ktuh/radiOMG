import Playlists from '../../api/playlists/playlists_collection.js';
import Shows from '../../api/shows/shows_collection.js';
import Profiles from '../../api/users/profiles_collection.js';
import moment from 'moment-timezone';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery';

export const getLocalTime = function() {
  return moment.tz('Pacific/Honolulu');
}

export const currentPlaylist = function() {
  return Playlists.find({
    $where: function() {
      var now = getLocalTime();
      return this.showDate.getYear() === now.year() &&
             this.showDate.getMonth() === now.month() &&
             this.showDate.getDate() === now.date() &&
             parseInt(this.startTime.split(':')[0], 10) <= now.hour();
    }
  }, { sort: { startTime: -1 } });
};

export const currentPlaylistFindOne = function() {
  var now = getLocalTime();
  var playlist = Playlists.findOne({
    $where: function() {
      return this.showDate.getYear() === now.year() &&
             this.showDate.getMonth() === now.month() &&
             this.showDate.getDate() === now.date() &&
             parseInt(this.startTime.split(':')[0], 10) <= now.hour();
    }
  }, { sort: { startTime: -1 } });

  if (playlist &&
    now.getHours() >= parseInt(playlist.endTime.split(':')[0], 10)) {
    return undefined;
  }
  else {
    return playlist;
  }
};

export const currentShow = function() {
  var now = getLocalTime();
  var show = Shows.findOne({ active: true, startDay: now.day(),
    startHour: { $lte: now.hour() },
    endDay: now.day() }, { sort: { startHour: -1 } });

  if (show === undefined) return undefined;

  var actualEndMinute = show.endMinute, actualEndHour = show.endHour,
    actualStartMinute = show.startMinute;

  if (actualStartMinute === 1) {
    actualStartMinute--;
  }

  if (actualEndMinute === 59) {
    actualEndMinute = 0;
    actualEndHour = (actualEndHour + 1) % 24;
  }

  if (actualEndHour > 0 && now.hour() < actualEndHour) {
    return show;
  }
  else if (actualEndHour === 0 && now.hour() < 24) {
    return show;
  }
  else {
    return undefined;
  }
};

export const nextShow = function() {
  var now = getLocalTime();
  var sameDay = Shows.findOne({ active: true, startDay: now.day(),
    startHour: { $gt: now.hour() }, endDay: now.day() });
  var tmr1 = Shows.findOne({ active: true, startDay: {
    $gte: (now.day() + 1) % 7 }
  }, { sort: { startDay: 1, startHour: 1, startMinute: 1 } });
  var tmr2 = Shows.findOne({ active: true, startDay: { $gte: 0 } },
    { sort: { startDay: 1, startHour: 1, startMinute: 1 } });

  return sameDay || tmr1 || tmr2;
};

export const thumbnailUrl = function(url, maxW) {
  Meteor.call('requestFrom', url, maxW, (err, data) => {
    if (!err) return data;
  });
  return 'https://s3-' + Meteor.settings.awsRegion +
    '.amazonaws.com/' + Meteor.settings.bucket + '/thumbs/' +
    url.split('/').slice(-1)[0] + '.jpg';
}

export const displayNameById = (userId) => {
  var profile = Profiles.findOne({ userId: userId });
  if (profile) return profile.name;
}

export const usernameById = (userId) => {
  var user = Meteor.users.findOne({ _id: userId });
  if (user) return user.username;
}

export const usernameFromDisplayName = (name) => {
  var profile = Profiles.findOne({ name: name });
  var user = profile && Meteor.users.findOne({ _id: profile.userId });
  return user && user.username;
};

export const displayNameFromUsername = (username) =>
  Profiles.findOne({ userId: Meteor.users.findOne({
    username: username
  })._id }).name;

export const showByShowId = (spinId) =>
  Shows.findOne({ showId: spinId });

export const timeDiffString = (str) => momentUtil(str).fromNow();

export const dateFormat = (date, format) =>
  momentUtil(date).format(format);

export const renderSummary = function(summary, numWords) {
  if (summary.indexOf('<') > -1) {
    summary = $.parseHTML(summary).map(node => node.innerText).join(' ');
  }
  var regex = new RegExp('(([^\\s]+\\s\\s*){' + numWords + '})(.*)');
  var match = regex.exec(summary);
  return (match && match[1] || summary) + '…';
}

export const getPathBySlug = function(template, slug) {
  return FlowRouter.path(template, { slug: slug });
}

export const pages = function(items, per) {
  var retval = [], page = 0, counter = 0;
  for (var i in items) {
    if (counter === 0) {
      retval.push([]);
    }
    retval[page].push(items[i]);
    counter++;
    if (counter === per) {
      counter = 0;
      page++;
    }
  }
  return retval;
}

export const requestSpinData = function(playlistId, cb) {
  if (playlistId < 10000) {
    Meteor.call('getPlaylistOrInfo', playlistId, true, cb);
  }
  else {
    Meteor.call('getPlaylistSpins', playlistId, cb);
  }
}
