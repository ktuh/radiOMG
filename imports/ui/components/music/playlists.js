import './playlists.html';
import { Template } from 'meteor/templating';
import { Playlists } from '../../../api/playlists/playlists_collection.js';
import { PlaylistsIndex } from '../../../api/playlists/playlist_index.js';
import { Shows } from '../../../api/shows/shows_collection.js';

Template.musicPlaylists.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('playlists', { limit: 10, sort: { showDate: -1 }});
    self.subscribe('shows');
  });
});

Template.musicPlaylists.helpers({
  img: (id) => Shows.findOne({showId: id}).featuredImage.value.url,
  index: () => PlaylistsIndex,
  attr: () => ({"placeholder": "Search Playlists..."}),
  showName: (id) => Shows.findOne({showId: id}).showName
});
