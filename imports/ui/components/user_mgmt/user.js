import './user.html';
import { Profiles } from '../../../api/users/profiles_collection.js';

Template.user.helpers({
  banned: (username) => Profiles.findOne({userId: Meteor.users.findOne({username: username})._id}).banned
});
