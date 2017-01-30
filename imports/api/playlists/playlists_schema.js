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
  },
  showDate: {
    type: Date,
    label: "Date of Show"
  }
});
