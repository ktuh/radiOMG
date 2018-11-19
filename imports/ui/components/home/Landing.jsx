import React, { Component } from 'react';
import { currentPlaylist, currentPlaylistFindOne, currentShow, getLocalTime,
  usernameFromDisplayName } from '../../../startup/lib/helpers.js';
import { withTracker } from 'meteor/react-meteor-data';
import NowPlaying from '../../../api/playlists/now_playing.js';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

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
  var show = currentShow();
  var playlist = currentPlaylistFindOne();
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

class LandingInfo extends Component {
  nowPlaying() {
    if (NowPlaying.findOne() !== undefined && !Session.get('timeout'))
      return NowPlaying.findOne().current;
    else return false;
  }

  render() {
    var self = this;
    return (
      <div className='landing__info'>
        {currentShow() && [
          <p className='landing__show-name caps' key='landing-show-name'>
            <a href={`/shows/${currentShow().slug}`}>
              {currentShow().showName}
            </a>
          </p>,
          isSubShow() && (
            <p className='landing__show-host caps' key='landing-show-host'>with
              {usernameFromDisplayName(showActualHost()) &&
                <a href={'/profile/' +
                  usernameFromDisplayName(showActualHost())}>
                  {showActualHost()}
                </a> || showActualHost()}
            </p>) ||
            <p className='landing__show-host caps' key='landing-show-host'>
              with {usernameFromDisplayName(currentShow().host) &&
              <a href={'/profile/' +
                usernameFromDisplayName(currentShow().host)}>
                {currentShow().host}
              </a> ||
              currentShow().host}
            </p>,
          (self.nowPlaying() && [<p className="landing__song-title caps"
            key='landing-song-title'>
            {self.nowPlaying().split(' - ')[1]}
          </p>,
          <p className="landing__song-artist caps" key='landing-sort-artist'>
            {' by ' + self.nowPlaying().split(' - ')[0]}
          </p>] || null)] ||
            self.nowPlaying() &&
              [<p className='landing__now-playing' key='landing-onair-text'>
                On Air Now:</p>,
              <p className="landing__song-title caps" key='landing-song-title'>
                {self.nowPlaying().split(' - ')[1]}
              </p>,
              <p className="landing__song-artist caps"
                key='landing-song-artist'>
                {' by ' + self.nowPlaying().split(' - ')[0]}
              </p>] || [
          <p className='landing__show-host' key='landing-show-host'>
            <b>Welcome to KTUH<br />FM Honolulu</b>
          </p>,
          <p className='landing__host-name' key="landing-host-name">
            Radio for the People</p>]}
      </div>
    );
  }
}

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  background() {
    var h = getLocalTime().hour();
    var $landing = $('.landing');

    if (h >= 6 && h < 18) {
      return 'url(\'/img/tantalus-morning.jpg\')';
    }
    else if ((h >= 18 && h <= 23) || (h >= 0 && h < 6)) {
      return 'url(\'/img/tantalus-evening.jpg\')';
    }
  }

  isPlaying() {
    return Session.get('nowLoaded') === scorpius.dictionary.get(
      'mainPage.audioUrl', '') && Session.get('paused') === false;
  }

  componentDidMount() {
    if (NowPlaying.findOne()) {
      Session.set('timeout',
        getLocalTime().diff(momentUtil(
          moment(NowPlaying.findOne().timestamp, 'Pacific/Honolulu'))
        ) > 360000
      );
    }
  }

  componentWillUnmount() {
    this.props.stop();
  }

  render() {
    var self = this;
    if (this.props.ready)
      return (
        <div className='landing' style={{ backgroundImage: this.background() }}>
          <div className='landing__box'>
            <div className='landing__play-btn-outer'>
              {(() => {
                if (self.isPlaying()) return [
                  <div className='landing__pause-btn-l'
                    key='pause-button-left'></div>,
                  <div className='landing__pause-btn-r'
                    key='pause-button-right'></div>
                ]; else return (
                  <div className='landing__play-btn' key='play-button'>
                    <div className='landing__play-btn-triangle'></div>
                  </div>
                );
              })()}
            </div>
            <LandingInfo host={showActualHost()} />
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
          <div className='landing__down-arrow'></div>
        </div>
      );
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('notices');
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
    ready: s1.ready() && s2.ready() && s3.ready(),
    stop: function() {
      s1.stop();
      s2.stop();
      s3.stop();
    }
  };
})(Landing);
