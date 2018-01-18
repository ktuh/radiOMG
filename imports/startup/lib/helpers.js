import Playlists from '../../api/playlists/playlists_collection.js';
import Shows from '../../api/shows/shows_collection.js';

export const currentPlaylist = function() {
  return Playlists.find({
    $where: function() {
      var now = new Date();
      return this.showDate.getYear() === now.getYear() &&
             this.showDate.getMonth() === now.getMonth() &&
             this.showDate.getDate() === now.getDate() &&
             parseInt(this.startTime.split(":")[0]) <= new Date().getHours() &&
             (parseInt(this.endTime.split(":")[0]) >= new Date().getHours() ||
             this.endTime === "00:00:00");
    }
  });
};

export const currentShow = function() {
  var now = new Date();
  return Shows.findOne({active: true, startDay: now.getDay(),
                        startHour: { $lte: now.getHours() }, endDay: now.getDay(),
                        endHour: { $gte: now.getHours() } }, { sort: { startHour: -1 }});
};

export const nextShow = function() {
  var now = new Date();
  var sameDay = Shows.findOne({active: true, startDay: now.getDay(),
                            startHour: { $gt: now.getHours() }, endDay: now.getDay() });
  var tmr1 = Shows.findOne({ active: true, startDay: { $gte: (now.getDay() + 1) % 7 }});
  var tmr2 = Shows.findOne({ active: true, startDay: { $gte: 0 } },
                        { sort: { startDay: 1, startHour: 1, startMinute: 1 }});

  return sameDay || tmr1 || tmr2;
};
