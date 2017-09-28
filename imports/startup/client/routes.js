import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/components/application/layout.js';
import '../../ui/components/application/not_found.js';
import '../../ui/components/chats/chat.js';
import '../../ui/components/home/home.js'
import '../../ui/components/home/landing.js';
import '../../ui/components/includes/errors.js';
import '../../ui/components/includes/footer.js';
import '../../ui/components/includes/header.js';
import '../../ui/components/includes/loginButtons.js';
import '../../ui/components/news/news_item.js';
import '../../ui/components/news/news_list.js';
import '../../ui/components/pages/pages_item.js'
import '../../ui/components/parties/party_list.js';
import '../../ui/components/parties/party_page.js';
import '../../ui/components/playlists/playlist_list.js';
import '../../ui/components/playlists/playlist_page.js';
import '../../ui/components/profile/profile_edit.js';
import '../../ui/components/profile/profile_page.js';
import '../../ui/components/reviews/review_list.js';
import '../../ui/components/reviews/review_page.js';
import '../../ui/components/shows/show_list.js';
import '../../ui/components/shows/show_page.js';
import '../../ui/components/charts/charts_list.js';
import '../../ui/components/charts/charts_page.js';
import '../../ui/components/music/charts.js';
import '../../ui/components/music/playlists.js';
import '../../ui/components/music/music.js';
import '../../ui/components/about/about.js';
import '../../ui/components/join/join.js';
import '../../ui/components/faq/faq.js';
import '../../ui/components/contact/contact.js';
import '../../ui/components/staff/staff.js';

FlowRouter.triggers.enter(
  [function() {
      $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
  }],
  { except: ['home'] }
);


FlowRouter.route('/', {
  name: 'home',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'home'});
  }
});

FlowRouter.route('/music', {
  name: 'music',
  action: function() {
    BlazeLayout.render('layout', {content: 'music'});
  }
});

FlowRouter.route('/news', {
  name: 'news',
  action: function () {
    BlazeLayout.render('layout', {content: 'newsList'});
  }
});

FlowRouter.route('/news/:slug', {
  name: 'newsPage',
  action: function () {
    BlazeLayout.render('layout', {content: 'newsItem'});
  }
});

FlowRouter.route('/events', {
  name: 'party',
  action: function () {
    BlazeLayout.render('layout', {content: 'partyList'});
  }
});

FlowRouter.route('/events/:slug', {
  name: 'partyPage',
  action: function () {
    BlazeLayout.render('layout', {content: 'partyPage'});
  }
});

FlowRouter.route('/playlists', {
  name: 'playlistList',
  action: function() {
    BlazeLayout.render('layout', {content: 'playlistList'});
  }
});

FlowRouter.route('/playlists/:id', {
  name: 'playlistPage',
  action: function() {
    BlazeLayout.render('layout', {content: 'playlistPage'});
  }
});

FlowRouter.route('/reviews/', {
  name: 'reviewsPage',
  action: function() {
    BlazeLayout.render('layout', {content: 'reviewList'});
  }
});

FlowRouter.route('/reviews/:slug', {
  name: 'review',
  action: function() {
    BlazeLayout.render('layout', {content: 'reviewPage'});
  }
});

FlowRouter.route('/shows', {
  name: 'show',
  action: function() {
    BlazeLayout.render('layout', {content: 'showList'});
  }
});

FlowRouter.route('/shows/:slug', {
  name: 'showPage',
  action: function () {
    BlazeLayout.render('layout', {content: 'showPage'});
  }
});

FlowRouter.route('/charts', {
  name: 'chartList',
  action: function () {
    BlazeLayout.render('layout', {content: 'chartList'});
  }
});

FlowRouter.route('/charts/:slug', {
  name: 'chartPage',
  action: function () {
    BlazeLayout.render('layout', {content: 'chartPage'});
  }
});

FlowRouter.route('/profile/:username', {
  name: 'profilePage',
  action: function () {
    BlazeLayout.render('layout', {content: 'profilePage'});
  }
});

FlowRouter.route('/profile', {
  name: 'profileEdit',
  action: function () {
    BlazeLayout.render('layout', {content: 'profileEdit'});
  }
});

FlowRouter.route('/about-us', {
  name: 'about',
  action: function() {
    BlazeLayout.render('layout', {content: 'about'});
  }
});

FlowRouter.route('/join-ktuh', {
  name: 'join',
  action: function() {
    BlazeLayout.render('layout', {content: 'join'});
  }
});

FlowRouter.route('/faq', {
  name: 'faq',
  action: function() {
    BlazeLayout.render('layout', {content: 'faq'});
  }
});

FlowRouter.route('/contact-us', {
  name: 'contact-us',
  action: function() {
    BlazeLayout.render('layout', {content: 'contact'});
  }
});

FlowRouter.route('/staff', {
  name: 'staff',
  action: function() {
    BlazeLayout.render('layout', {content: 'staff'});
  }
});

FlowRouter.route('/:slug', {
  name: 'page',
  action: function() {
    BlazeLayout.render('layout', {content: 'pagesItem'});
  }
});

FlowRouter.route('*', {
  action: function () {
    BlazeLayout.render('layout', {content: 'notFound'});
  }
});
