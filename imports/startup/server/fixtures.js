import { Playlists } from '/imports/api/playlists/playlists_collection.js';
import { Parties } from '/imports/api/parties/parties_collection.js';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/nicolaslopezj:roles';
import { Fake } from 'meteor/anti:fake';

if (!Accounts.findUserByUsername('davey')) {
  var now = new Date().getTime();

  daveyId = Accounts.createUser({
    profile: {
      name: 'Davey Shindig',
      bio: ' <p>After his youth in the frozen exurbs of the Twin Cities, David Wilkie, a.k.a. <b>Davey Shindig</b>, moved to Honolulu, Hawaii, where he has become a regular fixture in the nightlife. With current residencies at local hotspots like the Downbeat Lounge and Bevy, as well as opening sets for everyone from Diplo, A-Trak, and Steve Aoki to Andy Stott, Tokimonsta, and John Maus, Shindig has been gathering enthusiastic audience response and critical praise for his uniquely-styled indie electro-pop.</p><p>Classically trained in music and theater, and informed by degrees in computer science and audio production, Shindig brings his appreciation and deep understanding of the performing arts to bear in the kinetic, surprise-filled late night sets he\'s built his reputation upon. Quite simply, Shindig takes listeners on a cathartic journey through melodic electronic and acoustical sounds.</p><p>Seeing Honolulu in a musical rut, Shindig launched a weekly FM radio show called <b>808 Mixtapes</b>, to feature the talents of local DJs as well as talent passing through town. Along the way, he has played host to some big stars, with Tim Sweeney, Louisahhh!!!, Tamara Sky, Classixx, and Com Truise to name a few contributing to the show.</p><p>Shindig has stayed in Honolulu to help keep the local music scene from being completely overrun by cash-grabbing industry hacks. Simultaneously, with his multicultural perspective and budding multidisciplinary success, it is easy to see why Davey Shindig\'s renown is quickly growing beyond Hawaii\'s shores.</p><p><br><small>Photo c/o: <a href="https://www.google.com/search?q=vincent+ricafort">Vincent Ricafort</a></small></p>',
      website: 'http://808mix.com',
      soundcloud: '808mix',
      instagram: 'daveyshindig',
      facebook: 'davey.shindig',
      tumblr: '808mixtapes',
      twitter: 'daveyshindig',
      snapchat: ''
    },
    username: 'davey',
    emails: [
      { address: 'davey@example.com', verified: true }
    ],
    password: '123456',
  });

  Roles.addUserToRoles( daveyId,  ['admin'] );

  nickiId = Accounts.createUser({
    profile: {
      name: 'Nicki Ralar'
    },
    username: 'badlimbs',
    emails: [
      { address: 'nickiralar@gmail.com', verified: true }
    ],
    password: '654321'
  });

  Roles.addUserToRoles( nickiId,  ['admin'] );

  // Brah, dis steh one dummy acct, keh? No delete it.
  kkzId = Accounts.createUser({
    profile: {name: 'DJ Kodekrakkerz'},
    username: 'kodekrakkerz',
    emails: [
      {address: 'kodekrakkerz@gmail.com', verified: true}
    ],
    password: '666666'
  });

  Roles.addUserToRoles(kkzId, ['dj']);
  for (var p = 0; p < 117; p++) {
    fake = Accounts.createUser(Fake.user({fields: ["username", "emails.address", "profile.name"]}));
    Roles.addUserToRoles(fake, 'dj');
    Meteor.users.update(fake, {$set: {password: "000000"}});
  }
};

if (Parties.find().count() === 0) {
  var davey = Accounts.findUserByUsername( 'davey' );

  Parties.insert({
    title : '808 mixtapes',
    startTime : Date('2016-02-07T22:00:00Z'),
    endTime : Date('2016-02-08T04:00:00Z'),
    location : 'Davey\'s House',
    flyerFront : {
      fileId : '7QMJycqBipCXvYzH4',
      url : 'https://www2.hawaii.edu/~dwilkie/808flyer.jpg',
      info : {
        width : 500,
        height : 500,
        backgroundColor : '#0e0e0b',
        primaryColor : '#fcfcfa',
        secondaryColor : '#807d78'
      }
    },
    submitted : Date('2016-01-20T00:00:00Z'),
    userId : davey._id,
    author : davey.profile.name,
    commentCount : 0,
    upvoteCount : 1,
    upvoters: ['davey'],
    tags : [ 'sports', 'house party' ],
    isPinned : true,
    friendlySlugs : {
      slug : {
        base : 'superb-owl-sunday',
        index : 0
      }
    },
    slug : '808-mixtapes'
  });

  Parties.insert({
    title : 'Club Underground',
    startTime : Date('2016-02-06T07:00:00Z'),
    endTime : Date('2016-02-06T12:00:00Z'),
    location : 'The Downbeat Lounge',
    flyerFront : {
      fileId : 'pzeRPyRSpHofuTuqj',
      url : 'https://www2.hawaii.edu/~dwilkie/ff2.jpg',
      info : {
        width : 791,
        height : 791,
        backgroundColor : '#050205',
        primaryColor : '#bd4c17',
        secondaryColor : '#e79d36'
      }
    },
    flyerBack : {
      fileId : 'aqNbp2Yq5o6QRBfr4',
      url : 'https://www2.hawaii.edu/~dwilkie/cattop1.jpg',
      info : {
        width : 1280,
        height : 960,
        backgroundColor : '#7cc8bd',
        primaryColor : '#0b1513',
        secondaryColor : '#802118'
      }
    },
    submitted : Date('2016-01-20T00:00:00Z'),
    userId : davey._id,
    author : davey.profile.name,
    commentCount : 0, 'upvoteCount' : 0,
    tags : [ 'rock' ],
    isPinned : true,
    friendlySlugs : {
      slug : {
        base : 'club-underground', 'index' : 0
      }
    },
    slug : 'club-underground'
  });
}
