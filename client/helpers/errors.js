// Local (client-only) collection
import { Mongo } from 'meteor/mongo';
import { Bert } from 'meteor/themeteorchef:bert';

var Errors = new Mongo.Collection(null);

export default Errors;

export function throwError(message, type) {
  var type = type || 'default';
  Bert.alert(message, type);
};
