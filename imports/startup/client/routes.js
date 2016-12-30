import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/components/application/layout.js';
import '../../ui/components/includes/header.js';
import '../../ui/components/includes/errors.js';
import '../../ui/components/reviews/review_list.js';
import '../../ui/components/reviews/review_page.js';
import '../../ui/components/parties/party_list.js';
import '../../ui/components/parties/party_page.js';
import '../../ui/components/parties/party_edit.js';
import '../../ui/components/parties/party_create.js';
import '../../ui/components/news/news_item.js';
import '../../ui/components/news/news_list.js';
import '../../ui/components/chats/chat.js';
import '../../ui/components/application/not_found.js';
import '../../ui/components/profile/profile_edit.js';
import '../../ui/components/profile/profile_page.js';
import '../../ui/components/shows/show_page.js';

FlowRouter.route('/', {
  name: 'home',
  action: function () {
    BlazeLayout.render('layout', {content: 'notFound'});
  }
});

FlowRouter.notFound = {
  action: function () {
    BlazeLayout.render('layout', {content: 'notFound'});
  }
}

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

FlowRouter.route('/party', {
  name: 'party',
  action: function () {
    BlazeLayout.render('layout', {content: 'partyList'});
  }
});

FlowRouter.route('/party/new', {
  name: 'partyCreate',
  action: function () {
    BlazeLayout.render('layout', {content: 'partyCreate'});
  }
});

FlowRouter.route('/party/:slug', {
  name: 'partyPage',
  action: function () {
    BlazeLayout.render('layout', {content: 'partyPage'});
  }
});

FlowRouter.route('/party/edit/:slug', {
  name: 'partyEdit',
  action: function () {
    BlazeLayout.render('layout', {content: 'partyEdit'});
  }
});

FlowRouter.route('/reviews/', {
	name: 'reviewsPage',
	action: function() {
		BlazeLayout.render('layout', {content: 'reviewList'});
	}
});

FlowRouter.route('/review/:slug', {
	name: 'review',
	action: function() {
		BlazeLayout.render('layout', {content: 'reviewPage'});
	}
});
FlowRouter.route('/show', {
  name: 'show',
  action: function() {
    BlazeLayout.render('layout', {content: 'showList'});
  }
});
FlowRouter.route('/show/:slug', {
	name: 'showPage',
	action: function() {
		BlazeLayout.render('layout', {content: 'showPage'});
	}
});

FlowRouter.route('/profile', {
  name: 'profileEdit',
  action: function () {
    BlazeLayout.render('layout', {content: 'profileEdit'});
  }
});

FlowRouter.route('/:username', {
  name: 'profilePage',
  action: function () {
    BlazeLayout.render('layout', {content: 'profilePage'});
  }
});
