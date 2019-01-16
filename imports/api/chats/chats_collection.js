import { Meteor } from 'meteor/meteor';

export const ChatOptions = {
  defaultUserName: 'Anonymous',
  defaultDocId: 'openchat'
};

export const Chats = new Meteor.Collection('chats');
