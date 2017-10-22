import './playlist_sidebar.html';

Template.playlistSidebar.onCreated(function(){
  var self = this;
  self.subscribe('activeShows');
  self.subscribe("playlistsLimited", {sort: {showDate: -1, spinPlaylistId: -1}, limit: 12});
});

Template.playlistSidebar.helpers({
  showNameFromId: (id) => Shows.findOne({ showId: id }).showName,
  timeFromHours: (h1, h2) => moment(h1, "HH").format('h') + "-" + moment(h2, "HH").format('hA'),
  dateFormat: (date) => moment(date).format("ddd. MMMM DD, YYYY"),
  showTimeFromId: (id) => Shows.findOne({showId: id}).startHour,
  showEndFromId: (id) => Shows.findOne({showId: id}).endHour,
  getSidebarData: () => {
    var playlistDates = Playlists.find({}, {sort: {showDate: -1, spinPlaylistId: -1}, limit: 12}).fetch();
    var uniqDates = _.uniq(_.pluck(playlistDates, "showDate"), true, (date) => +date);
    var a = [];
    for (var p = 0; p < uniqDates.length; p++) {
      var r = {};
      r.date = uniqDates[p];
      r.shows = _.filter(playlistDates, (obj) => +obj.showDate === +uniqDates[p]);
      a.push(r);
    }
    return a;
  }
});
