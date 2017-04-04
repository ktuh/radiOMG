import './playlist_page.html';
import { Meteor } from 'meteor/meteor';
import { Playlists } from '../../../api/playlists/playlists_collection.js';
import { Shows } from '../../../api/shows/shows_collection.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import moment from "moment-timezone";

Template.playlistPage.onCreated(function(){
  var self = this;

  self.autorun(function(){
    var id = parseInt(FlowRouter.getParam('id'));
    self.subscribe("shows");
    self.subscribe("playlist", id, function() {

      Meteor.call("getPlaylist", parseInt(Playlists.findOne().spinPlaylistId), function(error, result) {
        if (!error) {
          if (result) Session.set("currentPlaylist", result);
        }
      });
    });
  });
});

Template.playlistPage.helpers({
  songs: function() {
    return Session.get("currentPlaylist");
  },
  showName: function() {
    return Shows.findOne({showId: Playlists.findOne().showId}).showName;
  },
  showDate: function() {
    return moment(Playlists.findOne().showDate).tz("US/Hawaii").format("YYYY/MM/DD");
  },
  showSlug: function() {
    return Shows.findOne({showId: Playlists.findOne().showId}).slug;
  }
});
