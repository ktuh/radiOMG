import { Roles } from 'meteor/nicolaslopezj:roles';

const DJ = new Roles.Role('dj');

DJ.allow('collections.shows.index', true);
DJ.allow('collections.shows.insert', true);
DJ.allow('collections.shows.update', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.shows.remove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.shows.showCreate', true);
DJ.allow('collections.shows.showUpdate', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.shows.showRemove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});

DJ.helper('collections.shows.indexFilter', {});

DJ.allow('collections.reviews.index', true);
DJ.allow('collections.reviews.insert', true);
DJ.allow('collections.reviews.update', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.reviews.remove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.reviews.showCreate', true);
DJ.allow('collections.reviews.showUpdate', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.reviews.showRemove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});

DJ.helper('collections.reviews.indexFilter', {});

DJ.allow('collections.parties.index', true);
DJ.allow('collections.parties.insert', true);
DJ.allow('collections.parties.update', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.parties.remove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.parties.showCreate', true);
DJ.allow('collections.parties.showUpdate', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.parties.showRemove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});

DJ.helper('collections.parties.indexFilter', {});

DJ.allow('collections.posts.index', true);
DJ.allow('collections.posts.insert', true);
DJ.allow('collections.posts.update', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.posts.remove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.posts.showCreate', true);
DJ.allow('collections.posts.showUpdate', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.posts.showRemove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});

DJ.helper('collections.posts.indexFilter', {});

DJ.allow('collections.playlists.index', true);
DJ.allow('collections.playlists.insert', true);
DJ.allow('collections.playlists.update', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.playlists.remove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.playlists.showCreate', true);
DJ.allow('collections.playlists.showUpdate', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.playlists.showRemove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});

DJ.helper('collections.playlists.indexFilter', {});
