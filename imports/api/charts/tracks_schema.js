import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default TracksSchema = new SimpleSchema({
  artist: {
    type: String,
    optional: false
  },
  song: {
    type: String,
    optional: false
  },
  release: {
    type: String,
    optional: true
  },
  label: {
    type: String,
    optional: false
  },
  newRelease: {
    type: Boolean
  },
  local: {
    type: Boolean
  }
});
