import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Shows } from '../shows/shows_collection.js';

export const PlaylistsSchema = new SimpleSchema({
	showId: orion.attribute("hasOne", {
		label: "Show"
	}, {
		collection: Shows,
		titleField: "showName",
		publicationName: "them_shows"
	}),
	spinPlaylistId: {
		type: Number,
		label: "Spinitron Playlist ID"
	}
	/* ,
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
  } */
});
