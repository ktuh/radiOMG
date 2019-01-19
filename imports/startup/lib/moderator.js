import { Roles } from 'meteor/nicolaslopezj:roles';

const Moderator = new Roles.Role('moderator');

Moderator.allow('collections.shows.index', true);
Moderator.allow('collections.shows.insert', true);
Moderator.allow('collections.shows.update', (userId, doc) =>
  doc.userId === userId);
Moderator.allow('collections.shows.remove', true);
Moderator.allow('collections.shows.showCreate', true);
Moderator.allow('collections.shows.showUpdate', true);
Moderator.allow('collections.shows.showRemove', true);
Moderator.helper('collections.shows.indexFilter', () => ({ }));

Moderator.allow('collections.reviews.index', true);
Moderator.allow('collections.review.insert', true);
Moderator.allow('collections.reviews.update', (userId, doc) =>
  doc.userId === userId);
Moderator.allow('collections.reviews.remove', true);
Moderator.allow('collections.reviews.showCreate', true);
Moderator.allow('collections.reviews.showUpdate', true);
Moderator.allow('collections.reviews.showRemove', true);
Moderator.helper('collections.reviews.indexFilter', () => ({ }));

Moderator.allow('collections.parties.index', true);
Moderator.allow('collections.parties.insert', true);
Moderator.allow('collections.parties.update', true);
Moderator.allow('collections.parties.remove', true);
Moderator.allow('collections.parties.showCreate', true);
Moderator.allow('collections.parties.showUpdate', true);
Moderator.allow('collections.parties.showRemove', true);
Moderator.helper('collections.parties.indexFilter', () => ({ }));

Moderator.allow('collections.posts.index', true);
Moderator.allow('collections.posts.insert', true);
Moderator.allow('collections.posts.update', true);
Moderator.allow('collections.posts.remove', true);
Moderator.allow('collections.posts.showCreate', true);
Moderator.allow('collections.posts.showUpdate', true);
Moderator.allow('collections.posts.showRemove', true);
Moderator.helper('collections.posts.indexFilter', () => ({ }));

Moderator.allow('filesystem.upload', true);

export default Moderator;
