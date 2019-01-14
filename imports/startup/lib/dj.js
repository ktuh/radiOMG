import { Roles } from 'meteor/nicolaslopezj:roles';
import { _ } from 'underscore';
import { Meteor } from 'meteor/meteor';

const DJ = new Roles.Role('dj');

DJ.allow('collections.shows.index', true);
DJ.allow('collections.shows.insert', true);
DJ.allow('collections.shows.update', (userId, doc) =>
  doc.userId === userId);
DJ.allow('collections.shows.remove', (userId, doc) =>
  doc.userId === userId);
DJ.allow('collections.shows.showCreate', true);
DJ.allow('collections.shows.showUpdate', true);
DJ.allow('collections.shows.showRemove', true);

DJ.helper('collections.shows.indexFilter', function() {
  return { userId: this.userId };
});

DJ.allow('collections.reviews.index', true);
DJ.allow('collections.reviews.insert', true);
DJ.allow('collections.reviews.update', (userId, doc) =>
  doc.userId === userId);
DJ.allow('collections.reviews.remove', (userId, doc) =>
  doc.userId === userId);
DJ.allow('collections.reviews.showCreate', true);
DJ.allow('collections.reviews.showUpdate', true);
DJ.allow('collections.reviews.showRemove', true);

DJ.deny('collections.reviews.update', (userId, doc, fields) => {
  var user = Meteor.users.findOne({ _id: userId });
  var roles = user && user.roles;
  return _.contains(fields, 'approved') && !_.contains(roles, 'moderator') &&
        !_.contains(roles, 'admin');
});

DJ.helper('collections.reviews.indexFilter', function() {
  return { userId: this.userId };
});

DJ.allow('collections.parties.index', true);
DJ.allow('collections.parties.insert', true);
DJ.allow('collections.parties.update', (userId, doc) =>
  doc.userId === userId);
DJ.allow('collections.parties.remove', (userId, doc) =>
  doc.userId === userId);
DJ.allow('collections.parties.showCreate', true);
DJ.allow('collections.parties.showUpdate', true);
DJ.allow('collections.parties.showRemove', true);

DJ.deny('collections.parties.update', (userId, doc, fields) => {
  var user = Meteor.users.findOne({ _id: userId });
  var roles = user && user.roles;
  return _.contains(fields, 'approved') && !_.contains(roles, 'moderator') &&
        !_.contains(roles, 'admin');
});

DJ.helper('collections.parties.indexFilter', function() {
  return { userId: this.userId };
});

DJ.allow('collections.posts.index', true);
DJ.allow('collections.posts.insert', true);
DJ.allow('collections.posts.update', (userId, doc) => {
  return doc.userId === userId && !doc.approved;
});
DJ.allow('collections.posts.remove', (userId, doc) =>
  doc.userId === userId && !doc.approved);
DJ.allow('collections.posts.showCreate', true);
DJ.allow('collections.posts.showUpdate', true);
DJ.allow('collections.posts.showRemove', true);

DJ.deny('collections.posts.update', (userId, doc, fields) => {
  var user = Meteor.users.findOne({ _id: userId });
  var roles = user && user.roles;
  return _.contains(fields, 'approved') && !_.contains(roles, 'moderator') &&
        !_.contains(roles, 'admin');
});

DJ.helper('collections.posts.indexFilter', function() {
  return { userId: this.userId };
});

DJ.allow('collections.playlists.index', true);
DJ.allow('collections.playlists.insert', false);
DJ.allow('collections.playlists.update', false);
DJ.allow('collections.playlists.remove', false);
DJ.allow('collections.playlists.showCreate', false);
DJ.allow('collections.playlists.showUpdate', false);
DJ.allow('collections.playlists.showRemove', false);

DJ.helper('collections.playlists.indexFilter', () => ({}));

DJ.allow('collections.comments.index', true);
DJ.allow('collections.comments.insert', true);
DJ.allow('collections.comments.update', false);
DJ.allow('collections.comments.remove', false);
DJ.allow('collections.comments.showCreate', false);
DJ.allow('collections.comments.showUpdate', false);
DJ.allow('collections.comments.showRemove', false);

DJ.helper('collections.comments.indexFilter', function() {
  return { userId: this.userId };
});

DJ.allow('collections.profiles.index', false);
DJ.allow('collections.profiles.insert', true);
DJ.allow('collections.profiles.update', (userId, doc) =>
  doc.userId === userId);
DJ.allow('collections.profiles.remove', false);
DJ.allow('collections.profiles.showCreate', false);
DJ.allow('collections.profiles.showUpdate', true);
DJ.allow('collections.profiles.showRemove', false);

DJ.helper('collections.profiles.indexFilter', function() {
  return { userId: this.userId };
});

DJ.allow('filesystem.upload', true);

export default DJ;
