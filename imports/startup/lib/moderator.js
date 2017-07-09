import { Roles } from 'meteor/nicolaslopezj:roles';

const Moderator = new Roles.Role('moderator');

Moderator.allow('collections.reviews.index', true);
Moderator.allow('collections.reviews.update', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});
Moderator.allow('collections.reviews.remove', function (userId, doc, fields, modifier) {
  return true;
});
Moderator.allow('collections.reviews.showUpdate', function (userId, doc, fields, modifier) {
  return true;
});
Moderator.allow('collections.reviews.showRemove', function (userId, doc, fields, modifier) {
  return true;
});
Moderator.helper('collections.reviews.indexFilter', function() {
  return { };
});

Moderator.allow('collections.parties.index', true);
Moderator.allow('collections.parties.update', function (userId, doc, fields, modifier) {
  return true;
});
Moderator.allow('collections.parties.remove', function (userId, doc, fields, modifier) {
  return true;
});
Moderator.allow('collections.parties.showUpdate', function (userId, doc, fields, modifier) {
  return true;
});
Moderator.allow('collections.parties.showRemove', function (userId, doc, fields, modifier) {
  return true;
});
Moderator.helper('collections.parties.indexFilter', function() {
  return { };
});

Moderator.allow('collections.posts.index', true);
Moderator.allow('collections.posts.update', function (userId, doc, fields, modifier) {
  return true;
});
Moderator.allow('collections.posts.remove', function (userId, doc, fields, modifier) {
  return true;
});
Moderator.allow('collections.posts.showUpdate', function (userId, doc, fields, modifier) {
  return true;
});
Moderator.allow('collections.posts.showRemove', function (userId, doc, fields, modifier) {
  return true;
});
Moderator.helper('collections.posts.indexFilter', function() {
  return { };
});

export default Moderator;
