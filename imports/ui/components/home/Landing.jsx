import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { currentPlaylistFindOne, currentShow, getLocalTime,
  usernameFromDisplayName } from '../../../startup/lib/helpers.js';
import { withTracker } from 'meteor/react-meteor-data';
import NowPlaying from '../../../api/playlists/now_playing.js';
import { default as momentUtil } from 'moment';
import moment from 'moment-timezone';
import { $ } from 'meteor/jquery';

function isSubShow() {
  var show = currentShow();
  var playlist = currentPlaylistFindOne();
  if (show && playlist) {
    return show.host !== playlist.djName;
  }
  else {
    return false;
  }
}

function showActualHost() {
  var show = currentShow(), playlist = currentPlaylistFindOne();
  if (show && playlist) {
    if (show.host === playlist.djName) {
      return show.host;
    }
    else if (show.host !== playlist.djName) {
      return playlist.djName;
    }
  }
  else if (show && !playlist) {
    return show.host;
  }
  else if (playlist && !show) {
    return playlist.djName;
  }
  else return undefined;
}

function LandingInfo({ nowPlaying }) {
  function timeout({ timestamp }) {
    return getLocalTime().diff(momentUtil(
      moment(timestamp, 'Pacific/Honolulu'))
    ) > 360000;
  }

  function whatsNowPlaying() {
    if (nowPlaying !== undefined && !timeout(nowPlaying))
      return nowPlaying.current;
    else return false;
  }

  function currentShowName() {
    return <p className='landing__show-name caps' key='landing-show-name'>
      <a href={`/shows/${currentShow().slug}`}>
        {currentShow().showName}
      </a>
    </p>
  }

  function currentShowHost() {
    var hostDisplayName = showActualHost() || currentShow().host, hostUsername =
      usernameFromDisplayName(isSubShow() ? showActualHost() :
        currentShow().host) || undefined;

    return <p className='landing__show-host caps' key='landing-show-host'>
      with{' '}
      {hostUsername ?
        <a href={`/profile/${hostUsername}`}>
          {hostDisplayName}
        </a> : hostDisplayName}
    </p>;
  }

  function renderNowPlaying() {
    var nowPlaying = whatsNowPlaying().split(' - '),
      artist = nowPlaying[0], title = nowPlaying[1];

    return [
      <p className="landing__song-title caps"
        key='landing-song-title'>
        {title}
      </p>,
      <p className="landing__song-artist caps" key='landing-sort-artist'>
        {` by ${artist}`}
      </p>
    ];
  }

  return <div className='landing__info'>
    {currentShow() ? [currentShowName(), currentShowHost()] :
      whatsNowPlaying() ?
        <p className='landing__now-playing' key='landing-onair-text'>
          On Air Now:</p> : null}
    {whatsNowPlaying() ? renderNowPlaying() : [
      <p className='landing__show-host' key='landing-show-host'>
        <b>Welcome to KTUH<br />FM Honolulu</b>
      </p>,
      <p className='landing__host-name' key="landing-host-name">
        Radio for the People</p>]}
  </div>;
}

LandingInfo.propTypes = {
  nowPlaying: PropTypes.object
}

function Landing({ ready, nowPlaying }) {
  let [state, setState] = useState({ playing: false });

  useEffect(function() {
    setState({
      playing: global.player && (!global.player.getPaused() &&
        global.player.getSrc() === 'http://stream.ktuh.org:8000/stream-mp3')
          || false
    });
  });

  function background() {
    var h = getLocalTime().hour();

    if (h >= 6 && h < 18) {
      return 'url(\'/img/tantalus-morning.jpg\')';
    }
    else if ((h >= 18 && h <= 23) || (h >= 0 && h < 6)) {
      return 'url(\'/img/tantalus-evening.jpg\')';
    }
  }

  function handleClickDownArrow() {
    var position = $('#main').offset().top;
    var navHeight = $('.navbar-header').height();
    $('HTML, BODY').animate({ scrollTop: position - navHeight + 2 }, 600);
  }

  function handlePlayBtn() {
    var paused = global.player.getPaused();
    if (global.player.getSrc() !== 'http://stream.ktuh.org:8000/stream-mp3') {
      global.player.setSrc('http://stream.ktuh.org:8000/stream-mp3');
      global.player.play();
      setState({ playing: true });
      return;
    }

    if (paused) {
      global.player.play();
    }
    else {
      global.player.pause();
    }

    setState({ playing: !paused });
  }

  if (ready)
    return <div className='landing' style={{ backgroundImage: background() }}>
      <div className='landing__box'>
        <div className='landing__play-btn-outer'
          onClick={handlePlayBtn}>
          {state.playing ? [
            <div className='landing__pause-btn-l'
              key='pause-button-left'></div>,
            <div className='landing__pause-btn-r'
              key='pause-button-right'></div>
          ] : (
            <div className='landing__play-btn' key='play-button'>
              <div className='landing__play-btn-triangle'></div>
            </div>
          )}
        </div>
        <LandingInfo host={showActualHost()} nowPlaying={nowPlaying} />
      </div>
      <h4 className='landing__freq landing__hnl-freq'>90.1 FM Honolulu</h4>
      <h4 className='landing__freq landing__ns-freq'>91.1 FM Waialua </h4>
      <a href='/playlists'>
        <h6 className='landing__current-playlist'>
          <span className='landing__view-current'>
            View Current{' '}
          </span>Playlist{'  '}
          <span className='glyphicon glyphicon-eye-open'></span>
        </h6>
      </a>
      <div className='landing__down-arrow'
        onClick={handleClickDownArrow}></div>
    </div>;
  else return null;
}

Landing.propTypes = {
  ready: PropTypes.bool,
  nowPlaying: PropTypes.object
}

export default withTracker(() => {
  var s2 = Meteor.subscribe('showNowPlaying', {
    onReady: function() {
      Meteor.subscribe('currentPlaylist', {
        onReady: function() {
          var playlist = currentPlaylistFindOne();
          var show = currentShow();
          if (show && playlist) {
            if (show.host === playlist.djName) {
              Meteor.subscribe('userById', show.userId);
              Meteor.subscribe('profileData', show.userId);
            }
            else if (show.host !== playlist.djName) {
              Meteor.subscribe('userByDisplayName', playlist.djName);
            }
          }
          else if (show && !playlist) {
            Meteor.subscribe('userById', show.userId);
            Meteor.subscribe('profileData', show.userId);
          }
        }
      });
    }
  });
  var s3 = Meteor.subscribe('nowPlaying');

  return {
    ready: s2.ready() && s3.ready(),
    nowPlaying: NowPlaying.findOne()
  };
})(Landing);
