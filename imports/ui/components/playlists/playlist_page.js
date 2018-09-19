import './playlist_page.html';
import './playlist_sidebar.js';
import '../../../ui/components/comments/comment_submit.js';
import '../../../ui/components/comments/comment_item.js';
import { Meteor } from 'meteor/meteor';
import Comments from '../../../api/comments/comments_collection.js';
import Playlists from '../../../api/playlists/playlists_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';

Template.playlistPage.onCreated(function(){
  var self = this;

  self.subscribe('activeShows');

  self.autorun(function(){
    var id = parseInt(FlowRouter.getParam('id'));

    self.subscribe('playlist', id, {
      onReady: function() {
        var playlist = Playlists.findOne({ spinPlaylistId: id });

        if (id > 10000) {
          Meteor.call('getPlaylistSpins', id,
            function(error, result) {
              if (!error && result) {
                Session.set('currentPlaylist', result.data.items);
                Session.set('playlistViewing', id);
              }
            });
        }
        else {
          Meteor.call('getPlaylistOrInfo', id, true,
            function(error, result) {
              if (!error && result) {
                Session.set('currentPlaylist',
                  JSON.parse(result.content).results);
                Session.set('playlistViewing', id);
              }
            });
        }

        self.subscribe('comments', playlist._id);
        if (playlist.showId > -1)
          self.subscribe('showBySpinitronId', playlist.showId);
      }
    });
  });

  self.subscribe('playlistsLimited', {
    sort: { showDate: -1, spinPlaylistId: -1 }, limit: 12
  });
});


Template.playlistPage.helpers({
  playlist: () => Playlists.findOne({
    spinPlaylistId: parseInt(FlowRouter.getParam('id'))
  }),
  comments: (id) => Comments.find({ postId: id }),
  songs: () => {
    var retval = Session.get('currentPlaylist');
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
  showTime: (playlist) =>
    playlist && ((momentUtil(
      moment(
        momentUtil(playlist.startTime, 'HH:mm:ss')).tz('Pacific/Honolulu'))
    ).format('h:mm') + '-' +
      momentUtil(
        moment(momentUtil(playlist.endTime, 'HH:mm:ss'))
          .tz('Pacific/Honolulu')).format('h:mm a')),
  showDateOfLatestPlaylist: (date) =>
    momentUtil(moment(date).tz('Pacific/Honolulu')).format('LL'),
  timeBeautify: (time) => {
    if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{4}/.exec(time) === null) {
      return momentUtil(
        time.substring(0, time.length - 3), 'HH:mm'
      ).format('hh:mma');
    }
    else {
      return momentUtil(
        moment(momentUtil(time), 'Pacific/Honolulu')
      ).format('hh:mma');
    }
  }
});
