import './playlist_page.html';
import '../comments/comment_container.js';
import '../comments/comment_item.js';
import { Meteor } from 'meteor/meteor';
import { Comments } from '../../../api/comments/comments_collection.js';
import { Playlists } from '../../../api/playlists/playlists_collection.js';
import { Shows } from '../../../api/shows/shows_collection.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import moment from "moment-timezone";

Template.playlistPage.onCreated(function(){
  var self = this;

  self.autorun(function(){
    var id = parseInt(FlowRouter.getParam('id'));

    self.subscribe("playlist", id, {
      onReady: function() {
        var playlist = Playlists.findOne({ spinPlaylistId: id });

        Meteor.call("getPlaylist", parseInt(playlist.spinPlaylistId), function(error, result) {
          if (!error) {
            if (result) Session.set("currentPlaylist", result);
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
});


Template.playlistPage.helpers({
  comments: function() {
    return Comments.find();
  },
  songs: function() {
    return Session.get("currentPlaylist");
  },
  showName: function() {
    return Shows.findOne({ showId: Playlists.findOne().showId }).showName;
  },
  showDate: function() {
    return moment(Playlists.findOne().showDate).tz("US/Hawaii").format("LL");
  },
  showSlug: function() {
    return Shows.findOne({ showId: Playlists.findOne().showId }).slug;
  },
  showImage: function() {
    var show = Shows.findOne({ showId: Playlists.findOne().showId })

    return (show === undefined) ? false : show.featuredImage.url;
  }
});
