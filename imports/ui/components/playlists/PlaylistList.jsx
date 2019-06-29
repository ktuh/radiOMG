import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { currentPlaylistFindOne, showByShowId, requestSpinData } from
  '../../../startup/lib/helpers.js';
import { Meteor } from 'meteor/meteor';
import PlaylistSidebar from './PlaylistSidebar.jsx';
import PlaylistTable from './PlaylistTable.jsx';
import Shows from '../../../api/shows/shows_collection.js';
import Profiles from '../../../api/users/profiles_collection.js';
import Playlists from '../../../api/playlists/playlists_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { default as momentUtil } from 'moment';
import moment from 'moment-timezone';
import { Session } from 'meteor/session';
import { Metamorph } from 'react-metamorph';

function PlaylistList({ currentPlaylist, ready }) {
  let [state, setState] = useState({ playlistLoaded: false });

  function isPlaylistCurrent() {
    var current = currentPlaylistFindOne();
    return current !== undefined;
  }

  function showTime(startDay, startHour) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday'];
    return `${days[startDay]}s at ${
      momentUtil().hour(startHour).format('h A')}`;
  }

  function actualShowHost(showId) {
    var showHost = Shows.findOne({ showId }).host;
    var playlistDJ = Playlists.findOne({}, { sort: { showDate: -1 } }).djName;
    if (showHost !== playlistDJ) return playlistDJ;
    else return showHost;
  }

  function timeHMS(date, startTime, endTime) {
    return `${momentUtil(moment(date, 'Pacific/Honolulu'))
      .format('ddd. MMM DD, YYYY')} ${momentUtil(startTime, 'HH:mm:ss')
      .format('hh:mm')}-${momentUtil(endTime, 'HH:mm:ss').format('hh:mm A')}`;
  }

  function usernameFromDisplayName(name) {
    var profile = Profiles.findOne({ name });
    var user = profile && Meteor.users.findOne({ _id: profile.userId });
    return user && user.username;
  }

  function usernameById(id) {
    var user = Meteor.users.findOne({ _id: id });
    if (user) return user.username;
    else return undefined;
  }

  function renderHost({ userId, showId, startDay, startHour, host }) {
    var { showDate, startTime, endTime, djName } = currentPlaylist;
    var latestShow = showByShowId(showId);

    if (usernameById(userId)) {
      if (actualShowHost(showId)) {
        return [`${showTime(startDay, startHour)} • Hosted by `,
          <a href={`/profile/${usernameById(userId)}`}>
            {actualShowHost(showId)}
          </a>];
      }
      else return [`${
        showTime(latestShow.startDay, latestShow.startHour)} • Hosted by `,
      <a href={`/profile/${usernameById(userId)}`}>{host}</a>];
    }
    else if (currentPlaylist) {

      return [`${timeHMS(showDate, startTime, endTime)} • Hosted by `,
        (usernameFromDisplayName(djName) && (
          <a href={`/profile/${usernameFromDisplayName(djName)}`}>
            {djName}
          </a>) || djName)];
    }
    else return null;
  }

  if (ready) {
    var pid = currentPlaylist.spinPlaylistId;
    if (!state.playlistLoaded) {
      requestSpinData(pid, (error, result) => {
        if (!error && result) {
          Session.set('currentPlaylist',
            pid > 10000 ?
              result.data.items :
              JSON.parse(result.content).results);
          Session.set('playlistViewing', pid);
          setState({ playlistLoaded: true });
        }
      });
    }
    var latestShow = showByShowId(currentPlaylist.showId);
    return [
      <Metamorph
        title="Show Playlists - KTUH FM Honolulu | Radio for the People"
        description="KTUH Show Playlists"
        image='https://ktuh.org/img/ktuh-logo.jpg' />,
      <h2 className='general__header' key='header-title'>Playlists</h2>,
      <div className='playlist-list__latest' key='playlist-content'>
        {latestShow && latestShow.thumbnail && (
          <a href={`/shows/${latestShow.slug}`}>
            <img className='playlist__show-image'
              src={latestShow.thumbnail} />
          </a>)}
        <h5 className='playlist-list__current'>
          {isPlaylistCurrent() ?
            'CURRENT PLAYLIST' : 'LAST LOGGED PLAYLIST'}
        </h5>
        <h3 className='playlist-list__show-name'>
          {latestShow && ((latestShow.slug && latestShow.showName) &&
              <a href={`/shows/${latestShow.slug}`}>
                {latestShow.showName}
              </a> || latestShow.showName || 'Sub Show')}
        </h3>
        {latestShow && latestShow.synopsis &&
          <p>{latestShow.synopsis}</p> || null}
        <h5 className='playlist-list__show-host'>
          {latestShow && renderHost(latestShow)}
        </h5>
        {state.playlistLoaded &&
          <PlaylistTable tracks={Session.get('currentPlaylist') || []}
            onPage={false}/> || null}
      </div>,
      <PlaylistSidebar key='playlist-sidebar' />
    ];
  }
  else return null;
}

PlaylistList.propTypes = {
  currentPlaylist: PropTypes.object,
  ready: PropTypes.bool
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('activeShows'),
    s2 = Meteor.subscribe('currentPlaylist', {
      onReady: function() {
        var playlist = Playlists.findOne({},
            { limit: 1, sort: { showDate: -1 } }),
          show = Shows.findOne({ showId: playlist.showId }),
          showId = show && show.showId || -1;

        if (showId > -1) {
          Meteor.subscribe('userById', show.userId);
          Meteor.subscribe('profileData', show.userId);
        }
        else {
          Meteor.subscribe('profileDataByUsername', playlist.djName);
          Meteor.subscribe('userByDisplayName', playlist.djName);
        }
      }
    });

  return {
    ready: s1.ready() && s2.ready(),
    currentPlaylist: Playlists.findOne({}, { sort: { showDate: -1 } })
  };
})(PlaylistList);
