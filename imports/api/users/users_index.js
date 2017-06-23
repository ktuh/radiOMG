import { Meteor } from 'meteor/meteor';
import { Index, MinimongoEngine } from 'meteor/easy:search';
import { _ } from 'meteor/underscore';

export const UsersIndex = new Index({
  engine: new MinimongoEngine({
    sort: function() {
      return { username: 1 };
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
  collection: Meteor.users,
  fields: ['username'],
  defaultSearchOptions: {
    limit: 20
  },
  permission: function() {
    return Meteor.user().roles.indexOf('admin') > -1 || Meteor.user().roles.indexOf('moderator') > -1
  }
});
