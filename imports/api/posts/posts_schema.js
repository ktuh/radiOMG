import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const PostsSchema = new SimpleSchema({
  userId: {
    type: String,
    autoform: {
			type: 'hidden',
			label: false
		},
		autoValue: function() {
			if (!this.isSet) return this.userId;
		}
  },
  author: {
    type: String,
    autoform: {
			type: 'hidden',
			label: false
		},
		autoValue: function() {
			if (!this.isSet) return Meteor.user().username;
		}
  },
  submitted: {
    type: Date,
    autoform: {
			type: 'hidden',
			label: false
		},
		defaultValue: new Date()
  },
  title: {
    type: String,
    label: 'Title',
    optional: false
  },
	tags: {
		type: [String],
		optional: true
	},
  body: orion.attribute('summernote', {
    type: String,
    label: 'Body',
    optional: false
  }),
  slug: {
    type: String,
    autoform: {
			type: 'hidden',
			label: false
		}
  },
  commentCount: {
    type: Number,
    label: 'Comment Count',
    defaultValue: 0
  }
});
