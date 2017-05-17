import { Playlists } from './playlists_collection.js';
import { Index, MinimongoEngine } from 'meteor/easy:search';
import { _ } from 'meteor/underscore';

export const PlaylistsIndex = new Index({
  engine: new MinimongoEngine({
    sort: function() {
      return { showDate: -1 };
    },
    selector: function (searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      return selector;
    }
  }),
  collection: Playlists,
  fields: ['showId'],
  defaultSearchOptions: {
    limit: 20
  },
  permission: () => true
});
