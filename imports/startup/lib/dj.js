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

DJ.helper('collections.shows.indexFilter', function() {
  return {
    createdBy: this.userId
  };
});

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

DJ.deny('collections.reviews.update', function(userId, doc, fields, modifier) {
  return !_.contains(fields, 'approved');
});

DJ.helper('collections.reviews.indexFilter', function() {
  return {
    createdBy: this.userId
  };
});

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

DJ.deny('collections.parties.update', function(userId, doc, fields, modifier) {
  return !_.contains(fields, 'approved');
});

DJ.helper('collections.parties.indexFilter', function() {
  return {
    createdBy: this.userId
  };
});

DJ.allow('collections.posts.index', true);
DJ.allow('collections.posts.insert', true);
DJ.allow('collections.posts.update', function (userId, doc, fields, modifier) {
  return doc.userId === userId && !doc.approved;
});
DJ.allow('collections.posts.remove', function (userId, doc, fields, modifier) {
  return doc.userId === userId && !doc.approved;
});
DJ.allow('collections.posts.showCreate', true);
DJ.allow('collections.posts.showUpdate', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.posts.showRemove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});

DJ.deny('collections.posts.update', function(userId, doc, fields, modifier) {
  return !_.contains(fields, 'approved');
});

DJ.helper('collections.posts.indexFilter', function() {
  return {
    createdBy: this.userId
  };
});

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

DJ.helper('collections.playlists.indexFilter', function() {
  return {
    createdBy: this.userId
  };
});

DJ.allow('collections.comments.index', true);
DJ.allow('collections.comments.insert', true);
DJ.allow('collections.comments.update', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.comments.remove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.comments.showCreate', true);
DJ.allow('collections.comments.showUpdate', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.comments.showRemove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});

DJ.helper('collections.comments.indexFilter', function() {
  return {
    createdBy: this.userId
  };
});

DJ.allow('collections.profiles.index', true);
DJ.allow('collections.profiles.insert', true);
DJ.allow('collections.profiles.update', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.profiles.remove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.profiles.showCreate', true);
DJ.allow('collections.profiles.showUpdate', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
DJ.allow('collections.profiles.showRemove', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});

DJ.helper('collections.profiles.indexFilter', function() {
  return {
    userId: this.userId
  };
});

DJ.allow('filesystem.upload', true);

export default DJ;
