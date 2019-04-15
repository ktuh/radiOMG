/*
 * This was adapted from the Chapp Meteor package.
 *
 * http://github.com/afruth/chapp
 */
import './chat.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';
import { Chats } from '../../../api/chats/chats_collection.js';

Template.chatForm.onCreated(function() {
  var self = this;
  self.autorun(function () {
    var dateNow = Session.get('chat-historysince');
    var chatid = '';
    if (!Session.equals('chat-docid', undefined)) {
      chatid = Session.get('chat-docid');
    }
    else chatid = null;
    self.subscribe('chats', chatid, dateNow);
  });
  Session.set('chat-username', Meteor.user().username);
});

Template.chatForm.helpers({
  chat: function() {
    return Chats.find({},{
      sort: {
        chatDate: 1
      }
    });
  }
});

Template.chatItem.helpers({
  formatDate: function(date) {
    return moment(date).format('hh:mm');
  }
});

Template.chatForm.events({
  'submit .chat__form': function(event) {
    event.preventDefault();
    var id = null, uname = null;
    if (!Session.equals('chat-docid',undefined)) id = Session.get('chat-docid');
    if (!Session.equals('chat-username',undefined))
      uname = Session.get('chat-username')
    var text = document.getElementById('chat__input').value;

    if (text != '') {
      Meteor.call('enterChat', text, id, uname);
      document.getElementById('chat__input').value = '';
      document.getElementById('chat__input').focus();
      var objDiv = document.getElementById('chat__text');
      objDiv.scrollTop = objDiv.scrollHeight + 270;
    }
  }
});
