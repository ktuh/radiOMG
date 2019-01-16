import { SimpleSchema } from 'meteor/aldeed:simple-schema';

var TracksSchema = new SimpleSchema({
  artist: {
    type: String,
    optional: true
  },
  song: {
    type: String,
    optional: true
  },
  release: {
    type: String,
    optional: true
  },
  label: {
    type: String,
    optional: true
  },
  newRelease: {
    type: Boolean,
    optional: true,
  },
  local: {
    type: Boolean,
    optional: true
  }
});

export default TracksSchema;
