import { Mongo } from 'meteor/mongo';
import { scorpius } from 'meteor/scorpiusjs:core';

import { PlaylistsSchema } from './playlists_schema.js';

export const Playlists = new scorpius.collection('playlists', {
  singularName: 'playlist',
  pluralName: 'playlists',
  tabular: {
    columns: [
      {
        data: 'spinPlaylistId',
        title: 'Playlist ID'
      },
      {
        data: "showDate",
        title: "Date of Show"
      }
    ]
  }
});

Playlists.attachSchema(PlaylistsSchema);
