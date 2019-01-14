import { Meteor } from 'meteor/meteor';
import Posts from '../posts_collection.js'
import { check } from 'meteor/check';

Meteor.publish('postsLimited', (options) => {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Posts.find({ featured: false, approved: true }, options);
});

Meteor.publish('posts', function() {
  return Posts.find({ approved: true }, { sort: { submitted: -1 } });
});

Meteor.publish('latestFeaturedPost', () =>
  Posts.find({ approved: true, featured: true },
    { sort: { submitted: -1 }, limit: 1 }));

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
  return Posts.find({ author: username, approved: true },
    { fields: { submitted: 1, title: 1, author: 1, userId: 1, slug: 1 } });
});
