import Playlists from '../../api/playlists/playlists_collection.js';
import Shows from '../../api/shows/shows_collection.js';
import { moment } from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';

export const currentPlaylist = function() {
  return Playlists.find({
    $where: function() {
      var now = moment().utcOffset("-10:00").toDate();
      return this.showDate.getYear() === now.getYear() &&
             this.showDate.getMonth() === now.getMonth() &&
             this.showDate.getDate() === now.getDate() &&
             parseInt(this.startTime.split(":")[0]) <= new Date().getHours();
    }
  }, { sort: { startTime: -1 } });
};

export const currentPlaylistFindOne = function() {
  var now = moment().utcOffset("-10:00").toDate();
  var playlist = Playlists.findOne({
    $where: function() {
      return this.showDate.getYear() === now.getYear() &&
             this.showDate.getMonth() === now.getMonth() &&
             this.showDate.getDate() === now.getDate() &&
             parseInt(this.startTime.split(":")[0]) <= new Date().getHours();
    }
  }, { sort: { startTime: -1 } });

  if (playlist && now.getHours() >= parseInt(playlist.endTime.split(":")[0])) {
    return undefined;
  }
  else {
    return playlist;
  }
};

export const currentShow = function() {
  var now = moment().utcOffset("-10:00").toDate();
  var show = Shows.findOne({ active: true, startDay: now.getDay(),
                         startHour: { $lte: now.getHours() },
                         endDay: now.getDay() }, { sort: { startHour: -1 }});

  if (show === undefined) return undefined;

  var actualEndMinute = show.endMinute, actualEndHour = show.endHour;
  var actualStartMinute = show.startHour, actualStartMinute = show.startMinute;

  if (actualStartMinute === 1) {
    actualStartMinute--;
  }

  if (actualEndMinute === 59) {
    actualEndMinute = 0;
    actualEndHour = (actualEndHour + 1) % 24;
  }

  if (actualEndHour > 0 && now.getHours() < actualEndHour) {
    return show;
  }
  else if (actualEndHour === 0 && now.getHours() < 24) {
    return show;
  }
  else {
    return undefined;
  }
};

export const nextShow = function() {
  var now = moment().utcOffset("-10:00").toDate();
  var sameDay = Shows.findOne({active: true, startDay: now.getDay(),
                            startHour: { $gt: now.getHours() }, endDay: now.getDay() });
  var tmr1 = Shows.findOne({ active: true, startDay: { $gte: (now.getDay() + 1) % 7 }},
                        { sort: { startDay: 1, startHour: 1, startMinute: 1 }});
  var tmr2 = Shows.findOne({ active: true, startDay: { $gte: 0 } },
                        { sort: { startDay: 1, startHour: 1, startMinute: 1 }});

  return sameDay || tmr1 || tmr2;
};

export const thumbnailUrl = function(url, maxW) {
  Meteor.call("requestFrom", url, maxW, (err, data) => {
    if (!err) return data;
  });
  return "https://s3-" + Meteor.settings.awsRegion +
    ".amazonaws.com/" + Meteor.settings.bucket + "/" + "thumbs/" +
    url.split("/").slice(-1)[0] + ".png";
}
