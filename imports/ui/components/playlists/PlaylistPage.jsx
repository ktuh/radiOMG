import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import { Metamorph } from 'react-metamorph';
import { FlowRouter } from 'meteor/kadira:flow-router'
import { requestSpinData } from '../../../startup/lib/helpers.js';

class PlaylistPage extends Component {
  static propTypes = {
    playlist: PropTypes.object,
    ready: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      playlistLoaded: false
    };

    this.showIfAny = this.showIfAny.bind(this);
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

  shouldComponentUpdate(nextProps) {
    return (nextProps.playlist && this.props.playlist &&
      nextProps.playlist.spinPlaylistId !==
      this.props.playlist.spinPlaylistId) || !this.state.playlistLoaded;
  }

  componentWillUpdate() {
    if (this.state.playlistLoaded) {
      this.setState({ playlistLoaded: false });
    }
  }

  render() {
    if (this.props.ready) {
      var playlist = this.props.playlist, pid = playlist.spinPlaylistId,
        show = this.showIfAny(), showString =
          `${this.showTime(playlist)} Sub Show with ${playlist.djName}`,
        self = this;
      if (show) {
        showString = show.showName + ' - ' +
          this.showDateOfLatestPlaylist(playlist.showDate);
      }
      if (!this.state.playlistLoaded) {
        requestSpinData(pid, (error, result) => {
          if (!error && result) {
            Session.set('currentPlaylist',
              pid > 10000 ?
                result.data.items :
                JSON.parse(result.content).results);
            Session.set('playlistViewing', pid);
            self.setState({ playlistLoaded: true });
          }
        });
      }
      return [
        <Metamorph title={showString +
          ' - KTUH FM Honolulu | Radio for the People'}
        description={showString} image={show && show.thumbnail ||
            'https://ktuh.org/img/ktuh-logo.png'} />,
        <h2 className='general__header'>
          {this.showIfAny() &&
            [<a href={`/shows/${this.showIfAny().slug}`}>
              {this.showIfAny().showName}
            </a>, ' playlist - ' +
            this.showDateOfLatestPlaylist(playlist.showDate)] ||
            [this.showTime(playlist) + ' w/ ' + playlist.djName +
          ' playlist - ' + this.showDateOfLatestPlaylist(playlist.showDate)]}
        </h2>,
        <div className='playlist__link'>
          <a href='/playlists' className='back-to'>← Back to Playlists</a>
        </div>,
        <div className='playlist__content'>
          {this.showIfAny() ?
            <a href={`/shows/${this.showIfAny().slug}`}>
              <img className='playlist__show-image'
                src={(this.showIfAny().thumbnail ||
                (this.showIfAny().featuredImage &&
                  this.showIfAny().featuredImage.url) :
                'https://ktuh.org/img/ktuh-logo.jpg')} />
            </a> : null}
          <PlaylistTable tracks={
            Session.get('currentPlaylist') || []
          } onPage={true}/>
          <div className='comments'>
            <h3 className='comments__header'>Comments</h3>
            {this.comments().length &&
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
  var id = parseInt(FlowRouter.getParam('id'), 10), s0,
    s1 = Meteor.subscribe('playlist', id, {
      onReady: function() {
        var playlist = Playlists.findOne({ spinPlaylistId: id });
        if (playlist)
          s0 = Meteor.subscribe('comments', playlist._id);
      }
    }),
    s3 = Meteor.subscribe('activeShows');

  return {
    playlistId: parseInt(FlowRouter.getParam('id'), 10),
    ready: (s0 && s0.ready() || true)
      && s1.ready() && s3.ready(),
    playlist: Playlists.findOne({ spinPlaylistId: id },
      {
        sort: { showDate: -1, spinPlaylistId: -1 }
      })
  }
})(PlaylistPage);
