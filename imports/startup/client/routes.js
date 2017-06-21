import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/components/application/layout.js';
import '../../ui/components/application/not_found.js';
import '../../ui/components/chats/chat.js';
import '../../ui/components/home/home.js'
import '../../ui/components/includes/errors.js';
import '../../ui/components/includes/footer.js';
import '../../ui/components/includes/header.js';
import '../../ui/components/includes/landing.js';
import '../../ui/components/news/news_item.js';
import '../../ui/components/news/news_list.js';
import '../../ui/components/pages/pages_item.js'
import '../../ui/components/playlists/playlist_page.js';
import '../../ui/components/profile/profile_edit.js';
import '../../ui/components/profile/profile_page.js';
import '../../ui/components/reviews/review_list.js';
import '../../ui/components/reviews/review_page.js';
import '../../ui/components/parties/party_edit.js';
import '../../ui/components/parties/party_create.js';
import '../../ui/components/parties/party_list.js';
import '../../ui/components/parties/party_page.js';
import '../../ui/components/shows/show_list.js';
import '../../ui/components/shows/show_create.js';
import '../../ui/components/shows/show_edit.js';
import '../../ui/components/shows/show_page.js';
import '../../ui/components/user_mgmt/user_mgmt.js';
import '../../ui/components/music/charts.js';
import '../../ui/components/music/playlists.js';
import '../../ui/components/music/music.js';

/*
 *  So, you know that annoying jQuery statement in every route?
 *  Yeah... because the writer of the SEO package seems to like
 *  putting random data attributes in meta tags...
 */

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
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
  BlazeLayout.render('layout', {content: 'music'});
  }
});

FlowRouter.route('/news', {
  name: 'news',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'newsList'});
  }
});

FlowRouter.route('/news/:slug', {
  name: 'newsPage',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'newsItem'});
  }
});

FlowRouter.route('/events', {
  name: 'party',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'partyList'});
  }
});

FlowRouter.route('/events/new', {
  name: 'partyCreate',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'partyCreate'});
  }
});

FlowRouter.route('/events/:slug', {
  name: 'partyPage',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'partyPage'});
  }
});

FlowRouter.route('/events/edit/:slug', {
  name: 'partyEdit',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'partyEdit'});
  }
});

FlowRouter.route('/playlist/:id', {
  name: 'playlistPage',
  action: function() {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'playlistPage'});
  }
});

FlowRouter.route('/reviews/', {
  name: 'reviewsPage',
  action: function() {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'reviewList'});
  }
});

FlowRouter.route('/review/:slug', {
  name: 'review',
  action: function() {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'reviewPage'});
  }
});

FlowRouter.route('/shows', {
  name: 'show',
  action: function() {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'showList'});
  }
});
FlowRouter.route('/shows/new', {
  name: 'showCreate',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'showCreate'});
  }
});

FlowRouter.route('/shows/:slug', {
  name: 'showPage',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'showPage'});
  }
});

FlowRouter.route('/shows/edit/:slug', {
  name: 'showEdit',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'showEdit'});
  }
});

FlowRouter.route('/profile/:username', {
  name: 'profilePage',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'profilePage'});
  }
});

FlowRouter.route('/profile', {
  name: 'profileEdit',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'profileEdit'});
  }
});

FlowRouter.route('/user_mgmt', {
  name: 'userMgmt',
  action: function() {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'userMgmt'});
  }
});

FlowRouter.route('/:slug', {
  name: 'page',
  action: function() {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'pagesItem'});
  }
});

FlowRouter.notFound = {
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'notFound'});
  }
}
