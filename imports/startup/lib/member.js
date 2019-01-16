import { Roles } from 'meteor/nicolaslopezj:roles';

const Member = new Roles.Role('member');

Member.allow('filesystem.upload', true);

Member.allow('collections.profiles.update', (userId, doc) =>
  doc.userId === userId);

export default Member;
