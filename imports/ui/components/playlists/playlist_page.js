import './playlist_page.html';
import './playlist_sidebar.js';
import '../../../ui/components/comments/comment_submit.js';
import { Meteor } from 'meteor/meteor';
import Comments from '../../../api/comments/comments_collection.js';
import Playlists from '../../../api/playlists/playlists_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { moment } from 'meteor/momentjs:moment';

Template.playlistPage.onCreated(function(){
  var self = this;

  self.subscribe('activeShows');

  self.autorun(function(){
    var id = parseInt(FlowRouter.getParam('id'));

    self.subscribe('playlist', id, {
      onReady: function() {
        var playlist = Playlists.findOne({ spinPlaylistId: id });
        var parsedId = parseInt(playlist.spinPlaylistId);

        Meteor.call('getPlaylistOrInfo', parsedId, true,
          function(error, result) {
            if (!error && result) {
              Session.set('currentPlaylist', result);
              Session.set('playlistViewing', parsedId);
            }
          });
        self.subscribe('showBySpinitronId', playlist.showId, {
          onReady: function() {
            self.subscribe('comments', playlist._id);
          }
        });
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
  songs: () => Session.get('currentPlaylist'),
  showTime: (playlist) =>
    playlist && (moment(playlist.startTime, 'HH:mm:ss').format('h:mm') +
      '-' + moment(playlist.endTime, 'HH:mm:ss').format('h:mm a')),
  showDateOfLatestPlaylist: (date) =>
    moment(date).utcOffset('-10:00').format('LL'),
  timeBeautify: (time) =>
    moment(time.substring(0, time.length - 3), 'HH:mm').format('hh:mm a')
});
