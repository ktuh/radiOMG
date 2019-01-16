import { scorpius } from 'meteor/scorpiusjs:core';
import ProfilesSchema from './profiles_schema';

var Profiles = new scorpius.collection('profiles', {
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
  insert: (userId, doc) => {
    return userId === doc.userId;
  },
  update: function (userId, doc) {
    return userId === doc.userId;
  }
});


Profiles.attachSchema(ProfilesSchema);

export default Profiles;
