import './footer.html';
import { Template } from 'meteor/templating';

Template.footer.helpers({
  year: () => new Date().getFullYear()
});
