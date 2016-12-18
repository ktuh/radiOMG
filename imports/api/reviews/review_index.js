import { Reviews } from '../reviews/reviews_collection.js';
import { EasySearch } from 'meteor/easy:search';

export const ReviewsIndex = new EasySearch.Index({
	collection: Reviews,
	fields: ['artist', 'releaseName'],
	engine: new EasySearch.MongoDB({
		sort: function() {
			return { submitted: -1 };
		}
	})
});
