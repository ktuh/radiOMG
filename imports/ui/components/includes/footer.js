import './footer.html';
import { Template } from 'meteor/templating';
import moment from 'moment-timezone';

Template.footer.helpers({
  year: () => moment(new Date()).tz("Pacific/Honolulu").toDate().getFullYear()
});
