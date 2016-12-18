import { Podcasts } from './podcasts_collection.js';
import { EasySearch } from 'meteor/easy:search';

export const PodcastsIndex = new EasySearch.Index({
  collection: Podcasts,
  fields: ['title', 'tags', 'host', 'episodeNumber'],
  engine: new EasySearch.MongoDB({
    sort: function () {
      return { episodeNumber: -1 };
    }
  }),
  defaultSearchOptions: {
    limit: 12
  }
});
