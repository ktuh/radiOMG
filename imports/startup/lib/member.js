import { Roles } from 'meteor/nicolaslopezj:roles';

const Member = new Roles.Role('member');

Member.allow('filesystem.upload', true);

Member.allow('collections.profiles.update', (userId, doc, fields, modifier) =>
  doc.userId === userId);

export default Member;
