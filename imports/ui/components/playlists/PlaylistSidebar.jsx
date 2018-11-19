import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import Shows from '../../../api/shows/shows_collection.js';
import Playlists from '../../../api/playlists/playlists_collection.js';
import { moment } from 'meteor/momentjs:moment';

class PlaylistSidebar extends Component {
  getSidebarData() {
    var viewingPlaylistId = Session.get('playlistViewing'), playlistDates;
    if (viewingPlaylistId) {
      playlistDates = Playlists.find({ spinPlaylistId: {
        $ne: viewingPlaylistId }
      }, {
        sort: { showDate: -1, spinPlaylistId: -1 }, limit: 12
      }).fetch();
    }
    else {
      playlistDates = Playlists.find({}, {
        sort: { showDate: -1, spinPlaylistId: -1 },
        limit: 12
      }).fetch();
    }
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
      r.shows = _.filter(playlistDates,
        (obj) => +obj.showDate === +uniqDates[p]);
      a.push(r);
    }
    return a;
  }

  timeFromHours(h1, m1, h2, m2) {
    if (m2 === 59) {
      h2 = (h2 + 1) % 24;
    }
    var ap = h1 > h2;
    if (ap) ap = 'hA';
    else ap = 'h';
    return moment(h1, 'HH').format(ap) + '-' + moment(h2, 'HH').format('hA');
  }

  timeFromHMS(str1, str2) {
    return moment(str1, 'HH:mm:ss').format('h') + '-' +
      moment(str2, 'HH:mm:ss').format('hA');
  }

  showById(id) {
    return Shows.findOne({ showId: id });
  }

  dateFormat(date) {
    return moment(date).format('ddd. MMMM DD, YYYY');
  }

  render() {
    return (
      <div className='playlist__sidebar corner'>
        <h4 className='playlist__sidebar-header'>Browse Latest</h4>
        {this.getSidebarData().map((listItem) => [
          <hr />,
          <h4 className='playlist__sidebar-date'>
            {this.dateFormat(listItem.date)}
          </h4>,
          listItem.shows.map((show) => (
            <div>
              <p className='playlist__sidebar-link'>
                <a href={`/playlists/${show.spinPlaylistId}`}>
                  {(show.showId > -1) && this.showById(show.showId) && [
                    this.timeFromHours(this.showById(show.showId).startHour,
                      this.showById(show.showId).startMinute,
                      this.showById(show.showId).endHour,
                      this.showById(show.showId).endMinute), ' '  + 
                    this.showById(show.showId).showName] || [
                    this.timeFromHMS(show.startTime, show.endTime) + ' w/ ' +
                show.djName]}
                </a>
              </p>
            </div>))
        ])}
      </div>
    );
  }
}

export default withTracker(() => {
  return {

  };
})(PlaylistSidebar)
