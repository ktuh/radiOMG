import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { currentPlaylistFindOne, currentShow, getLocalTime,
  usernameFromDisplayName } from '../../../startup/lib/helpers.js';
import { withTracker } from 'meteor/react-meteor-data';
import NowPlaying from '../../../api/playlists/now_playing.js';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';
import { $ } from 'meteor/jquery';
import { scorpius } from 'meteor/scorpiusjs:core';

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
  static propTypes = {
    nowPlaying: PropTypes.object
  }

  nowPlaying() {
    if (this.props.nowPlaying !== undefined &&
      !(this.timeout(this.props.nowPlaying)))
      return this.props.nowPlaying.current;
    else return false;
  }

  timeout(np) {
    return getLocalTime().diff(momentUtil(
      moment(np.timestamp, 'Pacific/Honolulu'))
    ) > 360000;
  }

  currentShowName() {
    return <p className='landing__show-name caps' key='landing-show-name'>
      <a href={`/shows/${currentShow().slug}`}>
        {currentShow().showName}
      </a>
    </p>
  }

  currentShowHost() {
    var hostDisplayName = showActualHost() || currentShow().host, hostUsername =
      usernameFromDisplayName(isSubShow() ?
        showActualHost() :
        currentShow().host) || undefined;

    return <p className='landing__show-host caps' key='landing-show-host'>
      with{' '}
      {hostUsername ?
        <a href={'/profile/' + hostUsername}>
          {hostDisplayName}
        </a> : hostDisplayName}
    </p>;
  }

  renderNowPlaying() {
    var nowPlaying = this.nowPlaying().split(' - '),
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

  render() {
    return (
      <div className='landing__info'>
        {currentShow() ? [
          this.currentShowName(),
          this.currentShowHost()] :
          this.nowPlaying() ?
            <p className='landing__now-playing' key='landing-onair-text'>
              On Air Now:</p> : null}
        {this.nowPlaying() ? this.renderNowPlaying() : [
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
  static propTypes = {
    ready: PropTypes.bool,
    nowPlaying: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      playing: false
    }

    this.handlePlayBtn = this.handlePlayBtn.bind(this);
    this.handleClickDownArrow = this.handleClickDownArrow.bind(this);
  }

  componentDidMount() {
    this.setState({
      playing: player && (!player.getPaused() &&
        player.getSrc() === 'http://stream.ktuh.org:8000/stream-mp3') || false
    });
  }

  background() {
    var h = getLocalTime().hour();

    if (h >= 6 && h < 18) {
      return 'url(\'/img/tantalus-morning.jpg\')';
    }
    else if ((h >= 18 && h <= 23) || (h >= 0 && h < 6)) {
      return 'url(\'/img/tantalus-evening.jpg\')';
    }
  }

  isPlaying() {
    return player.getSrc() === scorpius.dictionary.get(
      'mainPage.audioUrl', '') && !player.getPaused();
  }

  handleClickDownArrow() {
    var position = $('#main').offset().top;
    var navHeight = $('.navbar-header').height();
    $('HTML, BODY').animate({ scrollTop: position - navHeight + 2 }, 600);
  }

  handlePlayBtn() {
    var paused = player.getPaused();
    if (player.getSrc() !== 'http://stream.ktuh.org:8000/stream-mp3') {
      player.setSrc('http://stream.ktuh.org:8000/stream-mp3');
      player.play();
      this.setState({ playing: true });
      return;
    }

    if (paused) {
      player.play();
      this.setState({ playing: true });
    }
    else {
      player.pause();
      this.setState({ playing: false });
    }
  }

  render() {
    if (this.props.ready)
      return (
        <div className='landing' style={{ backgroundImage: this.background() }}>
          <div className='landing__box'>
            <div className='landing__play-btn-outer'
              onClick={this.handlePlayBtn}>
              {this.state.playing ? [
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
            <LandingInfo host={showActualHost()}
              nowPlaying={this.props.nowPlaying} />
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
            onClick={this.handleClickDownArrow}></div>
        </div>
      );
    else return null;
  }
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
