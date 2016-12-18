import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { orion } from 'meteor/orionjs:core';

export const ChatOptions = {
    defaultUserName: 'Anonymous',
    defaultDocId: 'openchat'
};

export const Chats = new Meteor.Collection("chats");
