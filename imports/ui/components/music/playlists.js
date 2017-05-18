import './playlists.html';
import { Template } from 'meteor/templating';
import { Playlists } from '../../../api/playlists/playlists_collection.js';
import { Shows } from '../../../api/shows/shows_collection.js';
import { pagination } from 'meteor/kurounin:pagination';

Template.musicPlaylists.onCreated(function() {
  var self = this;
  self.pagination = new Meteor.Pagination(Playlists, {sort: {showDate: -1}, perPage: 7});
  self.subscribe('shows');
});

Template.musicPlaylists.helpers({
  img: (id) => Shows.findOne({showId: id}).featuredImage.url,
  showName: (id) => Shows.findOne({showId: id}).showName,
  shows: () => Shows.find(),
  ready: () => Template.instance().pagination.ready(),
  tempPag: () => Template.instance().pagination,
  docs: () => Template.instance().pagination.getPage()
});
