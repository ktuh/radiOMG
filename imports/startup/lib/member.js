import { Roles } from 'meteor/nicolaslopezj:roles';

const Member = new Roles.Role('member');

Member.allow('filesystem.upload', true);

Member.allow('collections.profiles.update', function (userId, doc, fields, modifier) {
  return doc.userId === userId;
});

export default Member;
