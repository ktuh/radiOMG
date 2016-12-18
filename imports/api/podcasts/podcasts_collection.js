import { Mongo } from 'meteor/mongo';
import { orion } from 'meteor/orionjs:core';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { PodcastsSchema } from './podcasts_schema.js';

export const Podcasts = new orion.collection('podcasts', {
  singularName: 'podcast',
  pluralName: 'podcasts',
  tabular: {
    columns: [
      {
        data: 'coverImage',
        title: 'Cover Image',
        render: function (val, type, doc) {
          return "<img src=" + val + ">";
        }
      }, {
        data: 'title',
        title: 'Title'
      }, {
        data: 'host',
        title: 'Host'
      }, {
        data: 'episodeNumber',
        title: 'Episode #'
      }
    ]
  }
});

Podcasts.attachSchema(PodcastsSchema);
