import './shindig.html';
import { Template } from 'meteor/templating';

Template.shindig.onRendered(function () {
  Session.set('documentTitle', 'davey shindig');
});
