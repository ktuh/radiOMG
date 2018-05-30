// Local (client-only) collection
import { Mongo } from 'meteor/mongo';
import { Bert } from 'meteor/themeteorchef:bert';

export default Errors = new Mongo.Collection(null);

export function throwError(message, type) {
  var type = type || 'default';
  Bert.alert(message, type);
};
