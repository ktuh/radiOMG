// DEPRECATED
// Fixed files are now hosted on 808mix.com

// if (!Accounts.findUserByUsername('davey')) {
//   var now = new Date().getTime();

//   daveyId = Accounts.createUser({
//     profile: {
//       name: 'Davey Shindig'
//     },
//     username: "davey",
//     emails: [
//       { address: "davey@example.com", verified: true }
//     ],
//     password: "123456",
//   });

//   Roles.addUserToRoles( daveyId ,  ["admin"] );
// };

//   Comments.insert({
//     postId: postId,
//     userId: davey._id,
//     author: davey.profile.name,
//     submitted: new Date(now - 5 * 3600 * 1000),
//     body: 'Nice mix obvz!'
//   });

//   Comments.insert({
//     postId: postId,
//     userId: davey._id,
//     author: davey.profile.name,
//     submitted: new Date(now - 3 * 3600 * 1000),
//     body: 'I\'m replying to myself!'
//   });

//   Posts.insert({
//     userId: davey._id,
//     author: davey.profile.name,
//     submitted: new Date(now - 3 * 3600 * 1000),
//     title: 'Wonderful News!',
//     body: 'Wonderful news! It\'s so great. Etc etc blah blah',
//     slug: 'wonderful-news'
//   });

//   Posts.insert({
//     userId: davey._id,
//     author: davey.profile.name,
//     submitted: new Date(now - 3 * 3600 * 1000),
//     title: 'Add\'l Good News',
//     body: 'More news! It\'s also great. Etc etc blah blah',
//     slug: 'addl-good-news'
//   });
// };
