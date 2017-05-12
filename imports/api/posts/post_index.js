import { Posts } from './posts_collection.js';
import { Index, MinimongoEngine } from 'meteor/easy:search';
import { _ } from 'meteor/underscore';

export const PostsIndex = new Index({
  engine: new MinimongoEngine({
    sort: function() {
      return { submitted: -1 };
    },
    selector: function (searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
        categoryFilter = options.search.props.categoryFilter;

      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.category = categoryFilter;
      }

      return selector;
    }
  }),
  collection: Posts,
  fields: ['title', 'tags', 'isChart', 'slug'],
  defaultSearchOptions: {
    limit: 20
  },
  permission: () => true
});
