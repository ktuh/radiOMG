import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/components/application/layout.js';
import '../../ui/components/includes/header.js';
import '../../ui/components/includes/footer.js';
import '../../ui/components/includes/errors.js';
import '../../ui/components/reviews/review_list.js';
import '../../ui/components/reviews/review_page.js';
import '../../ui/components/parties/party_list.js';
import '../../ui/components/parties/party_page.js';
import '../../ui/components/parties/party_edit.js';
import '../../ui/components/parties/party_create.js';
import '../../ui/components/shows/show_list.js';
import '../../ui/components/shows/show_page.js';
import '../../ui/components/shows/show_edit.js';
import '../../ui/components/shows/show_create.js';
import '../../ui/components/news/news_item.js';
import '../../ui/components/news/news_list.js';
import '../../ui/components/chats/chat.js';
import '../../ui/components/application/not_found.js';
import '../../ui/components/profile/profile_edit.js';
import '../../ui/components/profile/profile_page.js';
import '../../ui/components/shows/show_page.js';
import '../../ui/components/playlists/playlist_page.js';
import '../../ui/components/shows/show_schedule.js';
import '../../ui/components/test/test.js';
import '../../ui/components/user_mgmt/user_mgmt.js';
import '../../ui/components/pages/pages_item.js'

FlowRouter.route('/', {
  name: 'home',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'notFound'});
  }
});

FlowRouter.notFound = {
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'notFound'});
  }
}

FlowRouter.route('/test', {
  name: 'testPage',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'testPage'});
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

FlowRouter.route('/party', {
  name: 'party',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'partyList'});
  }
});

FlowRouter.route('/party/new', {
  name: 'partyCreate',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'partyCreate'});
  }
});

FlowRouter.route('/party/:slug', {
  name: 'partyPage',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'partyPage'});
  }
});

FlowRouter.route('/party/edit/:slug', {
  name: 'partyEdit',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'partyEdit'});
  }
});

FlowRouter.route('/playlist/:id', {
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

FlowRouter.route('/show', {
  name: 'show',
  action: function() {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'showList'});
  }
});
FlowRouter.route('/show/new', {
  name: 'showCreate',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'showCreate'});
  }
});

FlowRouter.route('/show/:slug', {
  name: 'showPage',
  action: function () {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'showPage'});
  }
});

FlowRouter.route('/show/edit/:slug', {
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

FlowRouter.route('/schedule', {
  name: 'schedule',
  action: function() {
    $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
    BlazeLayout.render('layout', {content: 'showSchedule'});
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
