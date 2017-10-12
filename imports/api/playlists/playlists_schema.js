import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Shows from '../shows/shows_collection.js';

export default PlaylistsSchema = new SimpleSchema({
  showId: {
    type: Number,
    label: "Show ID"
  },
  spinPlaylistId: {
    type: Number,
    label: "Spinitron Playlist ID"
  },
  showDate: {
    type: Date,
    label: "Date of Show"
  }
});
