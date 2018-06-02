import './footer.html';
import { Template } from 'meteor/templating';
import moment from 'moment-timezone';
import { moment as momentUtil } from 'meteor/momentjs:moment';

Template.footer.helpers({
  year: () => momentUtil(moment().tz('Pacific/Honolulu')).year()
});
