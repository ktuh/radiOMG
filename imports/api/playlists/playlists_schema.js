import { SimpleSchema } from 'meteor/aldeed:simple-schema';

var PlaylistsSchema = new SimpleSchema({
  showId: {
    type: Number,
    label: 'Show ID'
  },
  spinPlaylistId: {
    type: Number,
    label: 'Spinitron Playlist ID'
  },
  showDate: {
    type: Date,
    label: 'Date of Show'
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

export default PlaylistsSchema;
