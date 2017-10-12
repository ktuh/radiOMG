import { Mongo } from 'meteor/mongo';
import { scorpius } from 'meteor/scorpiusjs:core';
import PlaylistsSchema from './playlists_schema.js';

export default Playlists = new scorpius.collection('playlists', {
  singularName: 'playlist',
  pluralName: 'playlists',
  link: {
    title: 'Playlists'
  },
  tabular: {
    columns: [
      {
        data: 'spinPlaylistId',
        title: 'Playlist ID'
      },
      {
        data: 'showId',
        title: 'Show ID'
      },
      {
        data: 'showDate',
        title: 'Date of Show'
      }
    ]
  }
});

Playlists.attachSchema(PlaylistsSchema);
