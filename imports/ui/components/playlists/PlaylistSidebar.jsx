import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import Shows from '../../../api/shows/shows_collection.js';
import Playlists from '../../../api/playlists/playlists_collection.js';
import { default as moment } from 'moment';
import { uniq, map, pluck } from 'underscore';

function PlaylistSidebar({ ready }) {
  let [state, setState] = useState({
    loaded: false,
    sidebar: null
  });

  function getSidebarData() {
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
    var uniqDates = uniq(map(pluck(playlistDates, 'showDate'),
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

  function timeFromHours(h1, m1, h2, m2) {
    if (m2 === 59) {
      h2 = (h2 + 1) % 24;
    }
    var ap = h1 > h2;
    if (ap) ap = 'hA';
    else ap = 'h';
    return `${moment(h1, 'HH').format(ap)}-${moment(h2, 'HH').format('hA')}`;
  }

  function timeFromHMS(str1, str2) {
    return `${moment(str1, 'HH:mm:ss').format('h')}-${
      moment(str2, 'HH:mm:ss').format('hA')}`;
  }

  function showById(id) {
    return Shows.findOne({ showId: id });
  }

  function dateFormat(date) {
    return moment(date).format('ddd. MMMM DD, YYYY');
  }

  function handleClick() {
    setState({ loaded: false, sidebar: state.sidebar });
  }

  useEffect(function() {
    var sidebar = getSidebarData(),
      stateObj =  sidebar.length ? { loaded: true, sidebar: sidebar } :
        { loaded: false, sidebar: null }
    setState(stateObj);
  }, [state.loaded, ready]);

  if (ready) {
    return (
      <div className='playlist__sidebar corner'>
        <h4 className='playlist__sidebar-header'>Browse Latest</h4>
        {!!state.sidebar && state.sidebar.map(({ date, shows }) => [
          <hr />,
          <h4 className='playlist__sidebar-date'>
            {dateFormat(date)}
          </h4>,
          shows.map(({ showId, spinPlaylistId, startTime, endTime, djName
          }) => {
            if (showId > -1) {
              var { startMinute, startHour, endHour, endMinute, showName } =
                showById(showId);
              return <div><p className='playlist__sidebar-link'>
                <a href={`/playlists/${spinPlaylistId}`} onClick={handleClick}>
                  {[timeFromHours(startHour, startMinute, endHour, endMinute),
                    ` ${showName}`] || [
                    `${timeFromHMS(startTime, endTime) } w/ ${djName}`] || null}
                </a>
              </p>
              </div>;
            }
          })
        ])}
      </div>
    );
  }
  else return null;
}

PlaylistSidebar.propTypes = {
  ready: PropTypes.bool
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('playlistsLimited', {
    sort: { showDate: -1, spinPlaylistId: -1 }, limit: 12 });
  return {
    ready: s1.ready()
  };
})(PlaylistSidebar)
