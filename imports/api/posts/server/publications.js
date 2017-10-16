import { Meteor } from 'meteor/meteor';
import Posts from '../posts_collection.js'
import { publishPagination } from 'meteor/kurounin:pagination';

Meteor.publish('postsLimited', (options) => {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Posts.find({ featured: false, approved: true }, options);
});

Meteor.publish('latestFeaturedPost', (count) => {
  check(count, Number);
  Posts.find({ approved: true, featured: true },
             { sort: { submitted: -1 }, limit: count })
  }
);

Meteor.publish('singlePost', (slug) => {
  check(slug, String);
  return Posts.find({ slug: slug });
});

Meteor.publish('singlePostById', (id) => {
  check(id, String);
  return Posts.find({ _id: id });
});

Meteor.publish('postsByUser', (username) => {
  check(username, String);
  return Posts.find({ author: username }, { fields: { submitted: 1, title: 1,
                                                      author: 1, userId: 1 }});
});

Meteor.publish('chartsPosts', () => Posts.find({ isChart: true }, { sort: { submitted: -1 },
                                                 fields: { slug: 1, submitted: 1, title: 1 }}));

publishPagination(Posts);
