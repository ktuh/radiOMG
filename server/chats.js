import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Chats, ChatOptions } from '../imports/api/chats/chats_collection.js';

Meteor.methods({
  enterChat: function(chatText,chatDoc,chatUser) {
    check(chatText, String);
    check(chatDoc, Match.Maybe(String));
    check(chatUser, Match.Maybe(String));

    if (!chatDoc)
      chatDoc = ChatOptions.defaultDocId;

    if (!chatUser)
      chatUser = ChatOptions.defaultUserName;
    else if (chatUser != Meteor.user().username)
      throw new Meteor.Error('invalid-chat-username',
        'Chat username must be the same as login username.');

    Chats.insert({
      chatText: chatText,
      chatDoc: chatDoc,
      chatUserName: chatUser,
      chatDate: new Date()
    });
  }
});
