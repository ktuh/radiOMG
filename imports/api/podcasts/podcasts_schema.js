import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const PodcastsSchema = new SimpleSchema({
  title: {
    type: String,
    optional: false,
    label: 'Episode Title'
  },
  episodeNumber: {
    type: Number,
    optional: false,
    label: "Episode #"
  },
  host: {
    type: String,
    optional: false,
    label: 'Host (or DJ)'
  },
  mp3: {
    type: String,
    optional: false,
    label: 'Audio',
  },
  coverImage: {
    type: String,
    label: 'Cover Image',
    optional: false
  },
  imageCredit: {
    type: String,
    optional: true,
    label: 'Image Credit',
  },
  userId: {
    type: String,
    label: 'User ID'
  },
  commentCount: {
    type: Number,
    label: 'Comment Count',
    defaultValue: 0
  },
  tags: {
    type: [String],
    label: 'Tags'
  },
  submitted: {
    type: Date,
    label: 'Submitted',
    defaultValue: new Date()
  },
  textPlaylist: orion.attribute('summernote', {
    type: String,
    optional: true,
    label: "Playlist",
    defaultValue: "",
  })
});
