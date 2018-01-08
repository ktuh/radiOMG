import Playlists from '../../api/playlists/playlists_collection.js';

export const currentPlaylist = function() {
  return Playlists.find({
    $where: function() {
      return this.showDate.getYear() === new Date().getYear() &&
             this.showDate.getMonth() === new Date().getMonth() &&
             this.showDate.getDate() === new Date().getDate() &&
             parseInt(this.startTime.split(":")[0]) <= new Date().getHours() &&
             (parseInt(this.endTime.split(":")[0]) > new Date().getHours() ||
             this.endTime === "00:00:00");
    }
  });
};
