import React, { Component } from 'react';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { withTracker } from 'meteor/react-meteor-data';
import Playlists from '../../../api/playlists/playlists_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { Bert } from 'meteor/themeteorchef:bert';
import { Helmet } from 'react-helmet';

class ShowPage extends Component {
  day(num) {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
      'Saturday'][num];
  }

  isPlaying(mp3) {
    return Session.get('nowLoaded') == mp3 && Session.get('paused') === false;
  }

  timeBeautify(startHour, startMinute, endHour, endMinute) {
    if (startMinute === 1) {
      startMinute--;
    }
    if (endMinute === 59) {
      endHour = (endHour + 1) % 24;
      endMinute = 0;
    }
    var ap = startHour > endHour;
    if (ap) ap = 'h:mmA';
    else ap = 'h:mm';
    return momentUtil(moment(momentUtil(startHour + ':' + startMinute, 'HH:mm'))
      .tz('Pacific/Honolulu')).format(ap) +
      '-' + momentUtil(moment(momentUtil(endHour + ':' + endMinute, 'HH:mm'),
      'Pacific/Honolulu')).format('h:mmA');
  }

  time(t) {
    return momentUtil(t).format('ddd. MMM. D, YYYY');
  }

  timeBeautify2(time) {
    return momentUtil(moment(momentUtil(time),
      'Pacific/Honolulu')).format('h:mma');
  }

  handlePlayClick(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    var mp3Url = $(event.currentTarget).data('path');
    var nowLoaded = Session.get('nowLoaded');

    if (nowLoaded != mp3Url) {
      var show = Shows.findOne({ slug: FlowRouter.getParam('slug') });
      $('.mejs__time-slider').css('visibility', 'visible');
      $('.mejs__broadcast').css('visibility', 'hidden');
      player.setSrc(mp3Url);
      var message = 'Now playing the latest episode of ' +
        this.props.show.showName;
      Session.set('defaultLoaded', false);
      Session.set('nowLoaded', mp3Url);
      if (!Session.get('playedStream')) Session.set('playedStream', true);
      Bert.alert(message, 'default', 'growl-top-right', 'fa-music');
    }

    if (player.paused) {
      player.play();
    }
    else if (!player.paused) {
      player.pause();
    }
  }

  handleSelectChange(event) {
    FlowRouter.go('/playlists/' + $(event.target).val());
  }

  handleProfileClick() {
    var id = Shows.findOne({ slug: FlowRouter.getParam('slug') }).userId;
    var user = Meteor.users.findOne({ _id: id });
    if (user !== undefined) FlowRouter.go('/profile/' + user.username);
  }

  latestPlaylist() {
    var show = Shows.findOne({ slug: FlowRouter.getParam('slug') }),
      showId = show && show.showId;
    return showId &&
      Playlists.findOne({ showId: showId }, { $sort: { showDate: -1 } });
  }

  componentWillMount() {
    var latest = this.latestPlaylist();
    if (latest) {
      if (latest !== undefined) {
        var parsedId = parseInt(latest.spinPlaylistId);
        if (parsedId < 10000) {
          Meteor.call('getPlaylistOrInfo',
            parsedId, true, function(error, result) {
              if (!error && result)
                Session.set('currentPlaylist',
                  JSON.parse(result.content).results);
            });
        }
        else {
          Meteor.call('getPlaylistSpins', parsedId,
            function(error, result) {
              if (!error && result)
                Session.set('currentPlaylist', result.data.items);
            });
        }
      }
    }
  }

  render() {
    var self = this, handlePlayClick = this.handlePlayClick.bind(this),
      handleSelectChange = this.handleSelectChange.bind(this),
      handleProfileClick = this.handleProfileClick.bind(this);

    if (this.props.ready) {
      return [
        <Helmet key="metadata">
          <title>{this.props.show.showName + ' - KTUH FM Honolulu' +
            ' | Radio for the People'}</title>
          <meta property="og:title"
            content={this.props.show.showName +
              ' - KTUH FM Honolulu' +
              ' | Radio for the People'} />
          <meta property="og:description" content={
            this.props.show.showName + ' on KTUH'} />
          <meta name="twitter:title" content={this.props.show.showName +
            ' - KTUH FM Honolulu | Radio for the People'} />
          <meta name="twitter:url" content="https://ktuh.org" />
          <meta name="twitter:description" content={
            this.props.show.showName + ' on KTUH'}  />
          <meta name="twitter:site" content="@ktuh_fm" />
          <meta name="twitter:image" content={
            (this.props.show.thumbnail || undefined) ||
            (!this.props.show.thumbnail &&
              'https://ktuh.org/img/ktuh-logo.jpg' || undefined)
          } />
          <meta name="twitter:creator" content="@ktuh_fm" />
          <meta property="description" content={
            this.props.show.showName + ' on KTUH'} />
        </Helmet>,
        <h2 className='general__header' key='header-title'>
          <b>{this.props.show.showName} / {this.props.show.host}</b>
        </h2>,
        <div className='show__link' key='shows-link'>
          <a href='/shows' className='back-to'>← Show Schedule</a>
        </div>,
        <div className="show__wrapper" key='show-wrapper'>
          <div className="show__content">
            {this.props.show.featuredImage &&
            <div className='show__image-div'>
              <img className='show__image'
                src={this.props.show.thumbnail ||
                  (this.props.show.featuredImage &&
                    this.props.show.featuredImage.url)} />
            </div> || null}
            <div className='show__info'>
              <h5 className='show__time'>
                {this.day(this.props.show.startDay)}{'s from '}
                {this.timeBeautify(this.props.show.startHour,
                  this.props.show.startMinute, this.props.show.endHour,
                  this.props.show.endMinute)}
              </h5>
              {this.props.show.genres && this.props.show.genres.length > 0 &&
              <div className='show-item__genres'>
                <span className='glyphicon glyphicon-music'></span>
                {' ' +  this.props.show.genres.join(', ')}
              </div> || null}
              <div className='show__buttons'>
                {this.props.show.latestEpisodeUrl &&
                <div className='button__wrapper'>
                  <p className='show__tag'>
                    <button type="button"
                      data-path={this.props.show.latestEpisodeUrl}
                      className=
                        {'btn btn-default show__play-btn color-button' + ' ' +
                            'purple-button'} onClick={handlePlayClick}
                      aria-label="Left Align">
                      <span
                        className=
                          {'glyphicon ' +
                            (this.isPlaying(this.props.show.latestEpisodeUrl) &&
                          'glyphicon-pause' || 'glyphicon-play')}
                        aria-hidden="true"></span> {' '}Play latest episode
                    </button>
                  </p>
                </div> || null}
                <div className='button__wrapper'>
                  <p className='show__host'>
                    <button type="button" className={'btn btn-default ' +
                      'goto-dj-profile color-button purple-button'}
                    onClick={handleProfileClick}
                    aria-label="Left Align">
                      DJ Profile
                    </button>
                  </p>
                </div>
              </div>
              <p className='show__body' dangerouslySetInnerHTML=
                {{ __html: this.props.show.body }} />
            </div>
          </div>
        </div>,
        this.latestPlaylist() && (
          <div className='show__latest' key='latest-episode'>
            <h5 className='show__latest-header'>Latest Episode</h5>
            <h2 className='show__latest-date'>
              {this.time(this.latestPlaylist().showDate)}
            </h2>
            {this.props.pastPlaylists(this.props.show.showId).length > 0 &&
              (
                <select onChange={handleSelectChange}>
                  <option value="" disabled={true} selected={true}>
                  Past Playlists &#x25BC;
                  </option>
                  {this.props.playlistsByYear(this.props.show.showId)
                    .map((playlistGroup) => ([
                      <option value="" disabled={true}>
                        {playlistGroup.year}</option>,
                      playlistGroup.shows.map((show) => (
                        <option value={show.spinPlaylistId}>
                          {self.time(show.showDate)}
                        </option>))
                    ]))}
                </select>) || null}
            <div className='show__latest-playlist' key='latest-playlist'>
              <table className='playlist'>
                <thead>
                  <tr className='playlist__info-row'>
                    <td><b>
                      <i className="fa fa-clock-o" aria-hidden="true"></i>
                    </b></td>
                    <td><b>Artist</b></td>
                    <td><b>Title</b></td>
                  </tr>
                </thead>
                <tbody>
                  {this.props.actualPlaylist(Session.get('currentPlaylist'))
                    .map((track) => (
                      <tr className='alternating'>
                        {track.start && [
                          <td className='playlist__timestamp'>
                            {this.timeBeautify2(track.start)}
                          </td>,
                          <td className='playlist__artist'>{track.artist}</td>,
                          <td className='playlist__title'><i>
                            {track.song}</i></td>
                        ] || [
                          <td className='playlist__timestamp'>
                            {this.timeBeautify2(track.Timestamp)}
                          </td>,
                          <td className='playlist__artist'>
                            {track.ArtistName}</td>,
                          <td className='playlist__title'>
                            <i>{track.SongName}</i></td>
                        ]}
                      </tr>))}
                </tbody>
              </table>
            </div>
          </div>) || null];
    }
    else return null;
  }
}

export default withTracker(() => {
  var slug = FlowRouter.getParam('slug'),
    s0, s2, s1 = Meteor.subscribe('singleShow', slug, {
      onReady: function() {
        var show = Shows.findOne({ slug: slug });
        if (show) {
          s0 = Meteor.subscribe('userById', show.userId);
          s2 = Meteor.subscribe('showPlaylists', show.showId);
        }
      }
    });

  return {
    ready: s1.ready() && (s0 && s0.ready()) && (s2 && s2.ready()),
    actualPlaylist: function(playlistData) {
      if (playlistData === undefined) return [];
      var retval = playlistData;
      retval.sort(function(a,b) {
        if (a.start > b.start) {
          return 1;
        }
        else if (a.start < b.start) {
          return -1;
        }
        else return 0;
      });
      return retval;
    },
    show: Shows.findOne({ slug: FlowRouter.getParam('slug') }),
    pastPlaylists: function(showId) {
      return Playlists.find({ showId: showId },
        { sort: { showDate: -1 }, skip: 1 }).fetch()
    },
    playlistsByYear: (showId) => {
      var playlistDates = Playlists.find({
        showId: showId
      }, { sort: { showDate: -1 }, skip: 1 }).fetch();
      var uniqDates = _.uniq(_.map(_.pluck(playlistDates, 'showDate'),
        (obj) => obj.getFullYear()), true, (date) => +date);
      var a = [];
      for (var p = 0; p < uniqDates.length; p++) {
        var r = {};
        r.year = uniqDates[p];
        r.shows = _.filter(playlistDates,
          (obj) => obj.showDate.getFullYear() === uniqDates[p]);
        a.push(r);
      }
      return a;
    }
  }
})(ShowPage);
