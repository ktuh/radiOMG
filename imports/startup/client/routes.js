import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactLayout } from 'meteor/kadira:react-layout';
import Layout from '../../ui/components/application/Layout.jsx';
import { $ } from 'meteor/jquery';

FlowRouter.notFound = {
  action: async function() {
    await import('../../ui/components/application/NotFound.jsx').then(
      function(NotFound) {
        ReactLayout.render(Layout, { content: <NotFound.default /> });
      }
    );
  }
};

FlowRouter.triggers.enter(
  [
    function() {
      $('#navigation').removeClass('in');
      window.scrollTo(0, 0);
    }
  ]
);

FlowRouter.route('/', {
  name: 'home',
  action: async function () {
    await import('../../ui/components/home/Home.jsx').then(
      function(Home) {
        ReactLayout.render(Layout, { content: <Home.default /> });
      }
    );
  }
});

FlowRouter.route('/radioblog/:slug', {
  name: 'newsPage',
  action: async function () {
    await import('../../ui/components/news/NewsPage.jsx').then(
      function(NewsPage) {
        ReactLayout.render(Layout, { content: <NewsPage.default /> });
      });
  }
});

FlowRouter.route('/radioblog', {
  name: 'radioblog',
  action: async function () {
    await import('../../ui/components/news/NewsList.jsx').then(
      function(NewsList) {
        ReactLayout.render(Layout, { content: <NewsList.default /> });
      });
  }
});

FlowRouter.route('/events/:slug', {
  name: 'partyPage',
  action: async function () {
    await import('../../ui/components/parties/PartyPage.jsx').then(
      function(PartyPage) {
        ReactLayout.render(Layout, { content: <PartyPage.default /> });
      });
  }
});

FlowRouter.route('/events', {
  name: 'party',
  action: async function () {
    await import('../../ui/components/parties/PartyList.jsx').then(
      function(PartyList) {
        ReactLayout.render(Layout, { content: <PartyList.default /> });
      });
  }
});

FlowRouter.route('/playlists/:id', {
  name: 'playlistPage',
  action: async function () {
    await import('../../ui/components/playlists/PlaylistPage.jsx').then(
      function(PlaylistPage) {
        ReactLayout.render(Layout, { content: <PlaylistPage.default /> });
      }
    );
  }
});

FlowRouter.route('/playlists', {
  name: 'playlistList',
  action: async function () {
    await import('../../ui/components/playlists/PlaylistList.jsx').then(
      function(PlaylistList) {
        ReactLayout.render(Layout, { content: <PlaylistList.default /> });
      }
    );
  }
});

FlowRouter.route('/reviews/:slug', {
  name: 'review',
  action: async function() {
    await import('../../ui/components/reviews/ReviewPage.jsx').then(
      function(ReviewPage) {
        ReactLayout.render(Layout, { content: <ReviewPage.default /> });
      }
    );
  }
});

FlowRouter.route('/reviews/', {
  name: 'reviewsPage',
  action: async function() {
    await import('../../ui/components/reviews/ReviewList.jsx').then(
      function(ReviewList) {
        ReactLayout.render(Layout, { content: <ReviewList.default /> });
      });
  }
});

FlowRouter.route('/shows/:slug', {
  name: 'showPage',
  action: async function() {
    await import('../../ui/components/shows/ShowPage.jsx').then(
      (ShowPage) => {
        ReactLayout.render(Layout, { content: <ShowPage.default /> });
      }
    );
  }
});

FlowRouter.route('/shows', {
  name: 'show',
  action: async function() {
    await import('../../ui/components/shows/ShowList.jsx').then(
      (ShowList) => {
        ReactLayout.render(Layout, { content: <ShowList.default /> });
      }
    );
  }
});

FlowRouter.route('/charts/:slug', {
  name: 'chartPage',
  action: async function () {
    await import('../../ui/components/charts/ChartsPage.jsx').then(
      function(ChartsPage) {
        ReactLayout.render(Layout, { content: <ChartsPage.default /> });
      });
  }
});

FlowRouter.route('/charts', {
  name: 'chartList',
  action: async function () {
    await import('../../ui/components/charts/ChartsList.jsx').then(
      function(ChartsList) {
        ReactLayout.render(Layout, { content: <ChartsList.default /> });
      });
  }
});

FlowRouter.route('/music', {
  name: 'music',
  action: async function() {
    await import('../../ui/components/music/Music.jsx').then(
      function(Music) {
        ReactLayout.render(Layout, { content: <Music.default /> });
      }
    );
  }
});

FlowRouter.route('/profile/:username', {
  name: 'profilePage',
  action: async function () {
    await import('../../ui/components/profile/ProfilePage.jsx').then(
      (ProfilePage) => {
        ReactLayout.render(Layout, { content: <ProfilePage.default /> });
      }
    );
  }
});

FlowRouter.route('/profile', {
  name: 'profileEdit',
  action: async function () {
    await import('../../ui/components/profile/ProfileEdit.jsx').then(
      function(ProfileEdit) {
        ReactLayout.render(Layout, { content: <ProfileEdit.default /> });
      }
    );
  }
});

FlowRouter.route('/alumni', {
  name: 'alumni',
  action: async function() {
    await import('../../ui/components/static_pages/Alumni.jsx').then(
      function(Alumni) {
        ReactLayout.render(Layout, { content: <Alumni.default /> });
      });
  }
});

FlowRouter.route('/about-us', {
  name: 'about',
  action: async function() {
    await import('../../ui/components/static_pages/About.jsx').then(
      function(About) {
        ReactLayout.render(Layout, { content: <About.default /> });
      });
  }
});

FlowRouter.route('/join-ktuh', {
  name: 'join',
  action: async function() {
    await import('../../ui/components/static_pages/Join.jsx').then(
      function(Join) {
        ReactLayout.render(Layout, { content: <Join.default /> });
      });
  }
});

FlowRouter.route('/faq', {
  name: 'faq',
  action: async function() {
    await import('../../ui/components/static_pages/FAQ.jsx').then(
      function(FAQ) {
        ReactLayout.render(Layout, { content: <FAQ.default /> });
      });
  }
});

FlowRouter.route('/contact-us', {
  name: 'contact-us',
  action: async function() {
    await import('../../ui/components/static_pages/Contact.jsx').then(
      function(Contact) {
        ReactLayout.render(Layout, { content: <Contact.default /> });
      }
    );
  }
});

FlowRouter.route('/staff', {
  name: 'staff',
  action: async function() {
    await import('../../ui/components/static_pages/Staff.jsx').then(
      function(Staff) {
        ReactLayout.render(Layout, { content: <Staff.default /> });
      });
  }
});

FlowRouter.route('/timeline', {
  name: 'timeline',
  action: async function() {
    await import('../../ui/components/static_pages/Timeline.jsx').then(
      function(Timeline) {
        ReactLayout.render(Layout, { content: <Timeline.default /> });
      }
    );
  }
});

FlowRouter.route('/underwriting', {
  name: 'underwriting',
  action: async function() {
    await import('../../ui/components/static_pages/Underwriting.jsx').then(
      function(Underwriting) {
        ReactLayout.render(Layout, { content: <Underwriting.default /> });
      }
    );
  }
});

FlowRouter.route('/resend', {
  name: 'resend',
  action: async function() {
    await import('../../ui/components/static_pages/Resend.jsx').then(
      function(Resend) {
        ReactLayout.render(Layout, { content: <Resend.default /> });
      });
  }
});

FlowRouter.route('/not-found', {
  name: 'notFound',
  action: async function() {
    await import('../../ui/components/application/NotFound.jsx').then(
      function(NotFound) {
        ReactLayout.render(Layout, { content: <NotFound.default /> });
      }
    );
  }
});

FlowRouter.route('/:slug', {
  name: 'page',
  action: async function() {
    await import('../../ui/components/pages/PagesItem.jsx').then(
      function(PagesItem) {
        ReactLayout.render(Layout, { content: <PagesItem.default /> });
      });
  }
});
