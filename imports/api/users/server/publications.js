Meteor.publish('userData', function (username) {
  check(username, String);
  return Meteor.users.find({username: username}, 
                           {fields: {'username': 1, 'profile': 1, '_id': 1}});
});