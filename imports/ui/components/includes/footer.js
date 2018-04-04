import './footer.html';
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';

Template.footer.helpers({
  year: () => moment.utc().utcOffset("-10:00").toDate().getFullYear()
});
