import './playlist_page.html';
import { Meteor } from 'meteor/meteor';
import { Playlists } from '../../../api/playlists/playlists_collection.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router'

Template.playlistPage.onCreated(function(){
	var self = this;

	self.autorun(function(){
		var id = parseInt(FlowRouter.getParam('id'));

		self.subscribe("playlist", id);
	});
});

Template.playlistPage.helpers({
	songs: function() {
		console.log("magic");
		return Meteor.call("getPlaylist", parseInt(Playlists.findOne().spinPlaylistId));
	}
});
