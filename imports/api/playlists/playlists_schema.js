import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const PlaylistsSchema = new SimpleSchema({
  episodeNumber: {
    type: Number,
    label: 'Episode Number',
    optional: false
  },
  tracks: {
    type: [Object],
    minCount: 1
  },
  'tracks.$.title': {
    type: String,
    optional: true,
    label: 'Title *'
  },
  'tracks.$.artist': {
    type: String,
    optional: false,
    label: 'Artist *'
  },
  'tracks.$.remix': {
    type: String,
    label: 'Remix',
    optional: true
  },
  'tracks.$.featuring': {
    type: String,
    label: 'Featuring',
    optional: true
  },
  'tracks.$.album': {
    type: String,
    label: 'Album',
    optional: true
  },
  'tracks.$.label': {
    type: String,
    label: 'Label',
    optional: true
  }
});
