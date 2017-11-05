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
  },
  startTime: {
    type: String,
    label: 'Start Time'
  },
  endTime: {
    type: String,
    label: 'End Time'
  },
  djName: {
    type: String,
    label: 'DJ Name'
  }
});
