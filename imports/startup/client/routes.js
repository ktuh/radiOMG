import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/components/application/layout.js';
import '../../ui/components/includes/errors.js';
import '../../ui/components/includes/footer.js';
import '../../ui/components/includes/header.js';
import '../../ui/components/includes/loginButtons.js';

FlowRouter.notFound = {
  action: async function() {
    await import('../../ui/components/application/not_found.js').then(function() {
      BlazeLayout.render('layout', {content: 'notFound'});
    });
  }
};

FlowRouter.triggers.enter(
  [
    function() {
      $('head meta[data-flow-router-seo="true"]').removeAttr("data-flow-router-seo");
      $('#navigation').removeClass('in');
      window.scrollTo(0, 0);
    }
  ]
);

FlowRouter.route('/', {
  name: 'home',
  action: async function () {
    await import('../../ui/components/home/home.js').then(async function() {
      await import('../../ui/components/home/landing.js').then(function() {
        BlazeLayout.render('layout', {content: 'home'});
      });
    });
  }
});

FlowRouter.route('/radioblog', {
  name: 'radioblog',
  action: async function () {
    await import('../../ui/components/news/news_list.js').then(function() {
      BlazeLayout.render('layout', {content: 'newsList'});
    });
  }
});

FlowRouter.route('/radioblog/:slug', {
  name: 'blogPage',
  action: async function () {
    await import('../../ui/components/news/news_item.js').then(function() {
      BlazeLayout.render('layout', {content: 'newsItem'});
    });
  }
});

FlowRouter.route('/events', {
  name: 'party',
  action: async function () {
    await import('../../ui/components/parties/party_list.js').then(function() {
      BlazeLayout.render('layout', {content: 'partyList'});
    });
  }
});

FlowRouter.route('/events/:slug', {
  name: 'partyPage',
  action: async function () {
    await import('../../ui/components/parties/party_page.js').then(function() {
      BlazeLayout.render('layout', {content: 'partyPage'});
    });
  }
});

FlowRouter.route('/playlists/:id', {
  name: 'playlistPage',
  action: async function () {
    await import('../../ui/components/playlists/playlist_page.js').then(async function() {
      await import('../../ui/components/playlists/playlist_sidebar.js').then(function() {
        BlazeLayout.render('layout', {content: 'playlistPage'});
      });
    });
  }
});

FlowRouter.route('/playlists', {
  name: 'playlistList',
  action: async function () {
    await import('../../ui/components/playlists/playlist_list.js').then(async function() {
      await import('../../ui/components/playlists/playlist_sidebar.js').then(function() {
        BlazeLayout.render('layout', {content: 'playlistList'});
      });
    });
  }
});

FlowRouter.route('/reviews/', {
  name: 'reviewsPage',
  action: async function() {
    await import('../../ui/components/reviews/review_list.js').then(function() {
      BlazeLayout.render('layout', {content: 'reviewList'});
    });
  }
});

FlowRouter.route('/reviews/:slug', {
  name: 'review',
  action: async function() {
    await import('../../ui/components/reviews/review_page.js').then(function() {
      BlazeLayout.render('layout', {content: 'reviewPage'});
    });
  }
});

FlowRouter.route('/shows', {
  name: 'show',
  action: async function() {
    await import('../../ui/components/shows/show_list.js').then(function() {
      BlazeLayout.render('layout', {content: 'showList'});
    });
  }
});

FlowRouter.route('/shows/:slug', {
  name: 'showPage',
  action: async function () {
    await import('../../ui/components/shows/show_page.js').then(function() {
      BlazeLayout.render('layout', {content: 'showPage'});
    });
  }
});

FlowRouter.route('/charts', {
  name: 'chartList',
  action: async function () {
    await import('../../ui/components/charts/charts_list.js').then(function() {
      BlazeLayout.render('layout', {content: 'chartList'});
    });
  }
});

FlowRouter.route('/charts/:slug', {
  name: 'chartPage',
  action: async function () {
    await import('../../ui/components/charts/charts_page.js').then(function() {
      BlazeLayout.render('layout', {content: 'chartPage'});
    });
  }
});

FlowRouter.route('/profile/:username', {
  name: 'profilePage',
  action: async function () {
    await import('../../ui/components/profile/profile_page.js').then(function() {
      BlazeLayout.render('layout', {content: 'profilePage'});
    });
  }
});

FlowRouter.route('/profile', {
  name: 'profileEdit',
  action: async function () {
    await import('../../ui/components/profile/profile_edit.js').then(function() {
      BlazeLayout.render('layout', {content: 'profileEdit'});
    });
  }
});

FlowRouter.route('/about-us', {
  name: 'about',
  action: async function() {
    await import('../../ui/components/about/about.js').then(function() {
      BlazeLayout.render('layout', {content: 'about'});
    });
  }
});

FlowRouter.route('/join-ktuh', {
  name: 'join',
  action: async function() {
    await import('../../ui/components/join/join.js').then(function() {
      BlazeLayout.render('layout', {content: 'join'});
    });
  }
});

FlowRouter.route('/faq', {
  name: 'faq',
  action: async function() {
    await import('../../ui/components/faq/faq.js').then(function() {
      BlazeLayout.render('layout', {content: 'faq'});
    });
  }
});

FlowRouter.route('/contact-us', {
  name: 'contact-us',
  action: async function() {
    await import('../../ui/components/contact/contact.js').then(function() {
      BlazeLayout.render('layout', {content: 'contact'});
    });
  }
});

FlowRouter.route('/staff', {
  name: 'staff',
  action: async function() {
    await import('../../ui/components/staff/staff.js').then(function() {
      BlazeLayout.render('layout', {content: 'staff'});
    });
  }
});

FlowRouter.route('/timeline', {
  name: 'timeline',
  action: async function() {
    await import('../../ui/components/timeline/timeline.js').then(function() {
      BlazeLayout.render('layout', {content: 'timeline'});
    });
  }
});

FlowRouter.route('/:slug', {
  name: 'page',
  action: async function(params) {
    await import('../../ui/components/pages/pages_item.js').then(async function () {
      await import('../../ui/components/application/not_found.js').then(function() {
        BlazeLayout.render('layout', {content: 'pagesItem'});
      });
    });
  }
});
