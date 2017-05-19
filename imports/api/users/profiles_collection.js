import { Mongo } from 'meteor/mongo';
import { scorpius } from 'meteor/scorpiusjs:core';
import { ProfilesSchema } from './profiles_schema';

export const Profiles = new scorpius.collection('profiles', {
  singularName: 'profile',
  pluralName: 'profiles',
  link: {
    title: 'Profiles'
  },
  tabular: {
    columns: [
      {
        data: 'name',
        title: 'name'
      }
    ]
  }
});

Profiles.allow({
  insert: function (userId, doc, fieldNames, modifier) {
    return Profiles.findOne({userId: userId}) !== undefined;
  },
  update: function (userId, doc, fieldNames, modifier) {
    return userId === doc.userId || Profile.findOne({userId: userId}).keys.length === 1;
  }
});


Profiles.attachSchema(ProfilesSchema);
