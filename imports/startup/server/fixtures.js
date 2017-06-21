import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/nicolaslopezj:roles';
import { Playlists } from '/imports/api/playlists/playlists_collection.js';
import { Posts } from '/imports/api/posts/posts_collection.js';
import { Reviews } from '/imports/api/reviews/reviews_collection.js';
import { Shows } from '/imports/api/shows/shows_collection.js';
import { Profiles } from '/imports/api/users/profiles_collection.js';

if (!Accounts.findUserByUsername('davey')) {
  var now = new Date().getTime();

  daveyId = Accounts.createUser({
    username: 'davey',
    email: 'davey@ktuh.org',
    password: '123456',
  });

  Roles.addUserToRoles( daveyId,  ['admin'] );

  // This update is necessary because the createUser function is fussy. If you
  // give it an email object instead of updating here, bizarrely the user will
  // be unable to login using their email address.
  Meteor.users.update({ _id: daveyId }, { $set: { emails: [{ address:
                      'davey@ktuh.org', verified: true }]}});

  nickiId = Accounts.createUser({
    username: 'badlimbs',
    email: 'nickiralar@gmail.com',
    password: '654321'
  });

  Roles.addUserToRoles( nickiId,  ['admin'] );

  Meteor.users.update({ _id: nickiId }, { $set: { emails: [{ address:
                      'nickiralar@gmail.com', verified: true }]}});

  derekId = Accounts.createUser({
    username: 'kodekrakkerz',
    emails: 'kodekrakkerz@gmail.com',
    password: '666666'
  });

  Roles.addUserToRoles(derekId, ['dj']);

  Meteor.users.update({ _id: derekId }, { $set: { emails: [{ address:
                      'kodekrakkerz@gmail.com', verified: true }]}});
};

if (Profiles.find().count() === 0) {
  var davey = Meteor.users.findOne({ username: 'davey' });

  Profiles.insert({
    userId: davey._id,
    name: 'Davey Shindig',
    bio: ' <p>After his youth in the frozen exurbs of the Twin Cities, David Wilkie, a.k.a. <b>Davey Shindig</b>, moved to Honolulu, Hawaii, where he has become a regular fixture in the nightlife. With current residencies at local hotspots like the Downbeat Lounge and Bevy, as well as opening sets for everyone from Diplo, A-Trak, and Steve Aoki to Andy Stott, Tokimonsta, and John Maus, Shindig has been gathering enthusiastic audience response and critical praise for his uniquely-styled indie electro-pop.</p><p>Classically trained in music and theater, and informed by degrees in computer science and audio production, Shindig brings his appreciation and deep understanding of the performing arts to bear in the kinetic, surprise-filled late night sets he\'s built his reputation upon. Quite simply, Shindig takes listeners on a cathartic journey through melodic electronic and acoustical sounds.</p><p>Seeing Honolulu in a musical rut, Shindig launched a weekly FM radio show called <b>808 Mixtapes</b>, to feature the talents of local DJs as well as talent passing through town. Along the way, he has played host to some big stars, with Tim Sweeney, Louisahhh!!!, Tamara Sky, Classixx, and Com Truise to name a few contributing to the show.</p><p>Shindig has stayed in Honolulu to help keep the local music scene from being completely overrun by cash-grabbing industry hacks. Simultaneously, with his multicultural perspective and budding multidisciplinary success, it is easy to see why Davey Shindig\'s renown is quickly growing beyond Hawaii\'s shores.</p><p><br><small>Photo c/o: <a href="https://www.google.com/search?q=vincent+ricafort">Vincent Ricafort</a></small></p>',
    website: 'http://808mix.com',
    soundcloud: '808mix',
    instagram: 'daveyshindig',
    facebook: 'davey.shindig',
    twitter: 'daveyshindig',
    snapchat: '123',
  });
};

if (Shows.find().count() === 0) {
  var davey = Accounts.findUserByUsername( 'davey' );

  Shows.insert({
    showName: '808mix',
    userId: davey._id,
    author: 'Davey',
    host: 'Davey',
    showId: 35,
    startDay: 0,
    startHour: '12',
    startMinute: '00',
    endDay: 0,
    endHour: '13',
    endMinute: '00',
    genres: ['House', 'Electro'],
    body: 'P cool show tbh',
    slug: '808-mix',
    active: true,
    latestEpdeUrl: 'http://stream.ktuh.org/archives/5.friday/6-9pm.mp3',
    featuredImage: {
      fileId: '7QMJycqBipCXvYzH4',
      url: 'http://ktuh.org/wp-content/uploads/2015/01/808-mixtapes-square-300x300.jpg',
      info: {
        width: 500,
        height: 500,
        backgroundColor: '#0e0e0b',
        primaryColor: '#fcfcfa',
        secondaryColor: '#807d78'
      }
    }
  });
};

if (Playlists.find().count() === 0) {
  Playlists.insert({
    showId: Shows.findOne().showId,
    spinPlaylistId: 52,
    showDate: '11/04/2016'
  });
};

if (Posts.find().count() === 0) {
  var davey = Meteor.users.findOne({ username: 'davey' });

  Posts.insert({
    _id: 'WmAF8ovhjhh2cwc2m',
    submitted: Date('2017-05-11T02:47:19Z'),
    title: 'Hello, World!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    commentCount: 0,
    slug: 'hello-world',
    userId: davey._id,
    author: 'davey',
    friendlySlugs: {
      slug: {
        base: 'hello-world',
        index: 0 }
    },
    photo: {
      fileId: '7QMJycqBibCXvYzH4',
      url: 'http://ktuh.org/wp-content/uploads/2017/04/music-sharing.jpg',
      info: {
        width: 500,
        height: 500,
        backgroundColor: '#0e0e0b',
        primaryColor: '#fcfcfa',
        secondaryColor: '#807d78'
      }
    },
    isChart: false
  });

  Posts.insert({
    _id: 'WmAF8ovhjhh2cwc3m',
    submitted: Date('2017-03-11T02:47:19Z'),
    title: 'Mesopotamia... What\'s THAT All About?',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    commentCount: 0,
    slug: 'hello-world',
    userId: davey._id,
    author: 'davey',
    friendlySlugs: {
      slug: {
        base: 'hello-world',
        index: 0 }
    },
    photo: {
      fileId: '7QMJycqBipCXvYzH4',
      url: 'http://ktuh.org/wp-content/uploads/2017/04/m120b-cover.jpg',
      info: {
        width: 500,
        height: 500,
        backgroundColor: '#0e0e0b',
        primaryColor: '#fcfcfa',
        secondaryColor: '#807d78'
      }
    },
    isChart: false
  });

  Posts.insert({
    _id: 'WmAF8ovhjhh2cwcrm',
    submitted: Date('2017-02-11T02:47:19Z'),
    title: 'How the Dog Got Its Bark',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    commentCount: 0,
    slug: 'hello-world',
    userId: davey._id,
    author: 'davey',
    friendlySlugs: {
      slug: {
        base: 'hello-world',
        index: 0
      }
    },
    photo: {
      fileId: '7QMJycqBipCXvYzH4',
      url: 'http://ktuh.org/wp-content/uploads/2017/04/bjork.jpg',
      info: {
        width: 500,
        height: 500,
        backgroundColor: '#0e0e0b',
        primaryColor: '#fcfcfa',
        secondaryColor: '#807d78'
      }
    },
    isChart: false
  });

  Posts.insert({
    _id: 'WmAF8ovhjhh2cwcra',
    submitted: Date('2017-01-11T02:47:19Z'),
    title: 'The All-Time Best 10 Songs About Butts',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    commentCount: 0,
    slug: 'hello-world',
    userId: davey._id,
    author: 'davey',
    friendlySlugs: {
      slug: {
        base: 'hello-world',
        index: 0 }
    },
    photo: {
      fileId: '7QMJycqBipCXvYzH4',
      url: 'http://ktuh.org/wp-content/uploads/2015/03/IMG_0483_opt-e1489259362248.jpg',
      info: {
        width: 500,
        height: 500,
        backgroundColor: '#0e0e0b',
        primaryColor: '#fcfcfa',
        secondaryColor: '#807d78'
      }
    },
    isChart: false
  });

  Posts.insert({
    _id: 'WmAF8ovhjhh2cwcrr',
    submitted: Date('2017-01-11T02:47:24Z'),
    title: 'Music Charts 2017/01/11',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    commentCount: 0,
    slug: 'music-charts-2017-01-11',
    userId: davey._id,
    author: 'davey',
    friendlySlugs: {
      slug: {
        base: 'music-charts',
        index: 0
      }
    },
    photo: {
      fileId: '7QMJycqBipCXvYzH4',
      url: 'http://ktuh.org/wp-content/uploads/2015/03/IMG_0483_opt-e1489259362248.jpg',
      info: {
        width: 500,
        height: 500,
        backgroundColor: '#0e0e0b',
        primaryColor: '#fcfcfa',
        secondaryColor: '#807d78'
      }
    },
    isChart: true
  });
};

if (Reviews.find().count() === 0) {
  Reviews.insert({
    _id : 's3ZANoSBCBsoGzhs3',
    submitted: Date('2017-05-11T20:27:25Z'),
    artist: 'Davey Shindig',
    releaseName: '808 Mixtapes v.105',
    year: 2015,
    label: 'SickTyte',
    rating: 5,
    image: {
       fileId: 'jrNdsRHas6X86tfNd',
       url: 'https://808mix.com/img/coverart/808-mixtapes-v105.jpg',
       info: {
         width: 480,
         height: 480,
         backgroundColor: '#fefefe',
         primaryColor: '#938e53',
         secondaryColor: '#010101'
       }
     },
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \ncommodo consequat. Duis aute irure dolor in reprehenderit in voluptate \nvelit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint \noccaecat cupidatat non proident, sunt in culpa qui officia deserunt \nmollit anim id est laborum.',
    slug: '808-mixtapes-v107',
    userId: 'gNETY8gvh4MYroX9H',
    author: 'davey',
    friendlySlugs: {
      slug: {
        base: '808-mixtapes-v107',
        index: 0
      }
    }
  });

  Reviews.insert({
    _id : 's3ZANoSBCBsoGzhs4',
    submitted: Date('2017-05-11T20:27:25Z'),
    artist: 'Dvzein',
    releaseName: '808 Mixtapes v.106',
    year: 2015,
    label: 'SickTyte',
    rating: 5,
    image: {
       fileId: 'jrNdsRHas6X86tfNd',
       url: 'https://s3-us-west-2.amazonaws.com/radiomg/scorpiusjs/1b87617e-e49f-4bde-b7f5-67808ab681c0.jpg',
       info: {
         width: 480,
         height: 480,
         backgroundColor: '#fefefe',
         primaryColor: '#938e53',
         secondaryColor: '#010101'
       }
     },
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \ncommodo consequat. Duis aute irure dolor in reprehenderit in voluptate \nvelit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint \noccaecat cupidatat non proident, sunt in culpa qui officia deserunt \nmollit anim id est laborum.',
    slug: '808-mixtapes-v107',
    userId: 'gNETY8gvh4MYroX9H',
    author: 'davey',
    friendlySlugs: {
      slug: {
        base: '808-mixtapes-v107',
        index: 0
      }
    }
  });

  Reviews.insert({
    _id : 's3ZANoSBCBsoGzhs5',
    submitted: Date('2017-05-11T20:27:25Z'),
    artist: 'Super CW',
    releaseName: '808 Mixtapes v.107',
    year: 2015,
    label: 'SickTyte',
    rating: 5,
    image: {
       fileId: 'jrNdsRHas6X86tfNd',
       url: 'https://808mix.com/img/coverart/808-mixtapes-v107.jpg',
       info: {
         width: 480,
         height: 480,
         backgroundColor: '#fefefe',
         primaryColor: '#938e53',
         secondaryColor: '#010101'
       }
     },
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \ncommodo consequat. Duis aute irure dolor in reprehenderit in voluptate \nvelit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint \noccaecat cupidatat non proident, sunt in culpa qui officia deserunt \nmollit anim id est laborum.',
    slug: '808-mixtapes-v107',
    userId: 'gNETY8gvh4MYroX9H',
    author: 'davey',
    friendlySlugs: {
      slug: {
        base: '808-mixtapes-v107',
        index: 0
      }
    }
  });

  Reviews.insert({
    _id : 's3ZANoSBCBsoGzhs6',
    submitted: Date('2017-05-11T20:27:25Z'),
    artist: 'HFM',
    releaseName: '808 Mixtapes v.108',
    year: 2015,
    label: 'SickTyte',
    rating: 5,
    image: {
       fileId: 'jrNdsRHas6X86tfNd',
       url: 'https://808mix.com/img/coverart/808-mixtapes-v108.jpg',
       info: {
         width: 480,
         height: 480,
         backgroundColor: '#fefefe',
         primaryColor: '#938e53',
         secondaryColor: '#010101'
       }
     },
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \ncommodo consequat. Duis aute irure dolor in reprehenderit in voluptate \nvelit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint \noccaecat cupidatat non proident, sunt in culpa qui officia deserunt \nmollit anim id est laborum.',
    slug: '808-mixtapes-v107',
    userId: 'gNETY8gvh4MYroX9H',
    author: 'davey',
    friendlySlugs: {
      slug: {
        base: '808-mixtapes-v107',
        index: 0
      }
    }
  });
};
