import { Meteor } from 'meteor/meteor';
import { Images } from '../images.js';

Meteor.publish('images', function() {
  return Images.find();
});
