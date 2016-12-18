import { Mongo } from 'meteor/mongo';
import { orion } from 'meteor/orionjs:core';

import { PlaylistsSchema } from './playlists_schema.js';

export const Playlists = new orion.collection('playlists', {
  singularName: 'playlist',
  pluralName: 'playlists',
  tabular: {
    columns: [
      {
        data: 'episodeNumber',
        title: 'Episode #'
      }
    ]
  }
});

Playlists.attachSchema(PlaylistsSchema);
