import React, { Component } from 'react';
import { currentPlaylistFindOne } from '../../../startup/lib/helpers.js';
import PlaylistSidebar from './PlaylistSidebar.jsx';
import PlaylistTable from './PlaylistTable.jsx';
import Playlists from '../../../api/playlists/playlists_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { Session } from 'meteor/session';
import Comments from '../../../api/comments/comments_collection.js';
import CommentItem from '../comments/CommentItem.jsx';
import CommentSubmit from '../comments/CommentSubmit.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';
import { Helmet } from 'react-helmet';
import { FlowRouter } from 'meteor/kadira:flow-router'

class PlaylistPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistLoadInit: false,
      playlistLoaded: false
    };
  }

  showDateOfLatestPlaylist(date) {
    return momentUtil(moment(date).tz('Pacific/Honolulu')).format('LL');
  }

  showTime(playlist) {
    return playlist && ((momentUtil(
      moment(
        momentUtil(playlist.startTime, 'HH:mm:ss')).tz('Pacific/Honolulu'))
    ).format('h:mm') + '-' +
      momentUtil(
        moment(momentUtil(playlist.endTime, 'HH:mm:ss'))
          .tz('Pacific/Honolulu')).format('h:mm a'));
  }

  showIfAny() {
    return Shows.findOne({ showId: this.props.playlist.showId });
  }

  comments() {
    var playlist = this.props.playlist;
    return Comments.find({ postId: playlist.showId }).fetch();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.playlist && this.props.playlist &&
      nextProps.playlist.spinPlaylistId !==
      this.props.playlist.spinPlaylistId) || !this.state.playlistLoaded;
  }

  componentWillUpdate() {
    if (this.state.playlistLoaded) {
      this.setState({ playlistLoaded: false });
    }
  }

  requestSpinData() {
    var self = this;

    var parsedId = parseInt(FlowRouter.getParam('id'));
    Session.set('playlistViewing', parsedId);
    if (parsedId > 10000) {
      Meteor.call('getPlaylistSpins', parsedId,
        function(error, result) {
          if (!error && result) {
            Session.set('currentPlaylist', result.data.items);

            self.setState({ playlistLoaded: true, playlistLoadInit: true });
          }
        });
    }
    else {
      Meteor.call('getPlaylistOrInfo', parsedId, true,
        function(error, result) {
          if (!error && result) {
            Session.set('currentPlaylist',
              JSON.parse(result.content).results);
            self.setState({ playlistLoaded: true, playlistLoadInit: true });
          }
        });
    }
  }

  render() {
    var requestSpinData = this.requestSpinData.bind(this);

    if (this.props.ready) {
      if (!this.state.playlistLoaded) requestSpinData();
      var playlist = this.props.playlist;
      var showIfAny = this.showIfAny.bind(this), show = showIfAny();
      var showString = this.showTime(playlist) + ' Sub Show with ' +
        playlist.djName;
      if (show) {
        showString = show.showName + ' - ' +
          this.showDateOfLatestPlaylist(playlist.showDate);
      }
      return [
        <Helmet key="metadata">
          <title>{showString +
            ' - KTUH FM Honolulu | Radio for the People'}</title>
          <meta property="og:title"
            content={showString +
              ' - KTUH FM Honolulu | Radio for the People'} />
          <meta property="og:description" content={showString} />
          <meta property="og:image" content={show && show.thumbnail ||
            '/img/ktuh-logo.png' } />
          <meta name="twitter:title" content={showString +
            ' - KTUH FM Honolulu | Radio for the People'} />
          <meta name="twitter:url" content="https://ktuh.org" />
          <meta name="twitter:description"
            content={showString} />
          <meta name="twitter:site" content="@ktuh_fm" />
          <meta name="twitter:image" content={
            (show && show.thumbnail || null) ||
            (!show && 'https://ktuh.org/img/ktuh-logo.jpg' || null)
          } />
          <meta name="twitter:creator" content="@ktuh_fm" />
          <meta property="description" content={showString} />
        </Helmet>,
        <h2 className='general__header'>
          {showIfAny() &&
            [<a href={`/shows/${showIfAny().slug}`}>
              {showIfAny().showName}
            </a>, ' playlist - ' +
            this.showDateOfLatestPlaylist(playlist.showDate)] ||
            [this.showTime(playlist) + ' w/ ' + playlist.djName +
          ' playlist - ' + this.showDateOfLatestPlaylist(playlist.showDate)]}
        </h2>,
        <div className='playlist__link'>
          <a href='/playlists' className='back-to'>← Back to Playlists</a>
        </div>,
        <div className='playlist__content'>
          {showIfAny() &&
            <a href={`/shows/${showIfAny().slug}`}>
              <img className='playlist__show-image'
                src={
                  showIfAny &&
                (!!showIfAny().thumbnail && showIfAny().thumbnail || null) ||
                (!showIfAny().thumbnail && !!showIfAny().featuredImage &&
                showIfAny().featuredImage.url || null) ||
                (!showIfAny().thumbnail && !showIfAny().featuredImage &&
                'https://ktuh.org/img/ktuh-logo.jpg' || null)} />
            </a> || null}
          <PlaylistTable tracks={
            Session.get('currentPlaylist') || []
          } onPage={true}/>
          <div className='comments'>
            <h3 className='comments__header'>Comments</h3>
            {this.comments().length > 0 &&
                <ul className='comments__list'>
                  {this.comments().comments.map((comment) =>
                    <CommentItem comment={comment}/>)}
                </ul> || null}
            {Meteor.user() && <CommentSubmit />  ||
              <p className='comments__text'>
                <i>Please log in to leave a comment.</i>
              </p>}
          </div>
        </div>,
        <PlaylistSidebar />];
    }
    else return null;
  }
}

export default withTracker(() => {
  var id = parseInt(FlowRouter.getParam('id')), s0,
    s1 = Meteor.subscribe('playlist', id, {
      onReady: function() {
        var playlist = Playlists.findOne({ spinPlaylistId: id });
        if (playlist)
          s0 = Meteor.subscribe('comments', playlist._id);
      }
    }),
    s3 = Meteor.subscribe('activeShows');

  return {
    playlistId: parseInt(FlowRouter.getParam('id')),
    ready: (s0 && s0.ready() || true)
      && s1.ready() && s3.ready(),
    playlist: Playlists.findOne({ spinPlaylistId: id },
      {
        sort: { showDate: -1, spinPlaylistId: -1 }
      })
  }
})(PlaylistPage);
