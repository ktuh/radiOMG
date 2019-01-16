import { Meteor } from 'meteor/meteor';
import { Chats, ChatOptions } from '../chats_collection.js';

Meteor.publish('chats', function(docId, dateNow) {
  check(docId, Match.Any);
  check(dateNow, Date);

  if (!docId)
    docId = ChatOptions.defaultDocId;

  var query = { chatDoc: docId };

  if (dateNow)
    query.chatDate = { $gte: dateNow };

  return Chats.find(query,{
    sort: {
      chatDate: 1
    },
    limit: 50
  });
});
