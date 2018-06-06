import './footer.html';
import { Template } from 'meteor/templating';
import { getLocalTime } from '../../../startup/lib/helpers.js';

Template.footer.helpers({
  year: () => getLocalTime().year()
});
