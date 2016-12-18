import { Posts } from '../collections/posts.js';
import { EasySearch } from 'meteor/easy:search';

export const PostsIndex = new EasySearch.Index({
	collection: Posts,
	fields: ['title', 'tags'],
	engine: new EasySearch.MongoDB({
		sort: function() {
			return {submitted: -1};
		}
	})
});
