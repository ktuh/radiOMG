import './playlist_sidebar.html';

Template.playlistSidebar.onCreated(function(){
  var self = this;
  self.subscribe('shows');
  self.subscribe('playlistsLimited', {sort: {showDate: -1, spinPlaylistId: -1}, limit: 12});
});

Template.playlistSidebar.helpers({
  validDate: (date) => date !== undefined,
  showIsSub: (id) => id === -1,
  timeFromHMS: (str1, str2) => moment(str1, 'HH:mm:ss').format('h') + '-' + moment(str2, 'HH:mm:ss').format('hA'),
  timeFromHours: (h1, h2) => moment(h1, 'HH').format('h') + '-' + moment(h2, 'HH').format('hA'),
  dateFormat: (date) => moment(date).format('ddd. MMMM DD, YYYY'),
  getSidebarData: () => {
    var playlistDates = Playlists.find({}, {sort: {showDate: -1, spinPlaylistId: -1}, limit: 12}).fetch();
    var uniqDates =
      _.uniq(_.map(_.pluck(playlistDates, 'showDate'),
        (date) => {
          date.setSeconds(0);
          date.setMilliseconds(0);
          date.setHours(0);
          date.setMinutes(0);
          return date;
        }), true, (date) => +date);

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
