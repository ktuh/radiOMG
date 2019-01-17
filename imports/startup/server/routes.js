import { Meteor } from 'meteor/meteor';
import { Picker } from 'meteor/meteorhacks:picker';
import { check } from 'meteor/check';
import Posts from '../../api/posts/posts_collection.js';
import Reviews from '../../api/reviews/reviews_collection.js';
import Shows from '../../api/shows/shows_collection.js';
import Charts from '../../api/charts/charts_collection.js';
import Profiles from '../../api/users/profiles_collection.js';
import Playlists from '../../api/playlists/playlists_collection.js';
import Parties from '../../api/parties/parties_collection.js';
import NowPlaying from '../../api/playlists/now_playing.js';
import bodyParser from 'body-parser';
import { getLocalTime } from '../lib/helpers.js';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';
import React from 'react';
import { Helmet } from 'react-helmet';
import { renderToStaticMarkup } from 'react-dom/server';
import SSRLayout from '../../ui/components/application/SSRLayout.jsx'

Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: false }));

Picker.route('/spinitron/latest', function(params, req, res, next) {
  check(params.query, { playlistId: Match.Where(function(str) {
    check(str, String);
    return /[0-9]+/.test(str);
  }), show: Match.Where(function(str) {
    check(str, String);
    return /[0-9]+/.test(str);
  }), artist: String, song: String, dj: String });

  var showId = parseInt(params.query.show);
  var showItself = Shows.findOne({ showId: showId });
  if (!showItself) showId = -1;
  var playlistId = parseInt(params.query.playlistId);
  var html = params.query.artist + ' - ' + params.query.song;

  if (!Playlists.findOne({ spinPlaylistId: playlistId })) {
    if (playlistId <= 1000000) {
      Meteor.call('getPlaylistOrInfo', parseInt(params.query.playlistId), false,
        function(error, result) {
          if (!error && result) {
            Playlists.insert({
              showId: showId,
              spinPlaylistId: playlistId,
              showDate: getLocalTime().toDate(),
              startTime: result.OnairTime,
              endTime: result.OffairTime,
              djName: result.DJName
            });
          }
        }
      );
    }
    else {
      Meteor.call('getPlaylistOrInfo2', playlistId,
        function(error, result) {
          if (!error && result) {
            Playlists.insert({
              showId: (() => {
                if (Shows.findOne({ showId: result.data.show_id }))
                  return result.data.show_id; else return -1;})(),
              spinPlaylistId: playlistId,
              showDate: getLocalTime().toDate(),
              startTime:
                momentUtil(moment(result.data.start).tz('Pacific/Honolulu'))
                  .format('HH:mm:ss'),
              endTime:
                momentUtil(moment(result.data.end).tz('Pacific/Honolulu'))
                  .format('HH:mm:ss'),
              djName: params.query.dj
            });
          }
        });
    }
  }

  if (NowPlaying.find({}).count() < 1) {
    NowPlaying.insert({
      current: html, timestamp: getLocalTime().toDate()
    });
  }
  else {
    NowPlaying.update(NowPlaying.findOne()._id, {
      $set: {
        current: html,
        timestamp: getLocalTime().toDate()
      }
    });
  }

  res.statusCode = 200;
  res.end();
});

// SEO Routes
const SeoRouter = Picker.filter(function(request) {
  var botAgents = [
    /^facebookexternalhit/i, // Facebook
    /^linkedinbot/i, // LinkedIn
    /^twitterbot/i, // Twitter
    /^slackbot-linkexpanding/i, // Slack,
    /google/i, // Google
    /varvy/i // Varvy
  ];

  var agent = request.headers['user-agent'];
  var botIsUsed = false;

  botAgents.forEach(function(botAgent) {
    if (botAgent.test(agent)) botIsUsed = true;
  });

  var escapedFragmentIsUsed = /_escaped_fragment_/.test(request.url);

  return escapedFragmentIsUsed || botIsUsed;
});

var renderOut = (component) => {
  var html = renderToStaticMarkup(<SSRLayout content={component} />),
    helmet = Helmet.renderStatic();
  return `<!doctype html>
    <html lang="en">
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <script src="https://use.typekit.net/kdq4qji.js"></script>
        <script>try{Typekit.load({ async: true });}catch(e){}</script>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;
};

SeoRouter.route('/', async function(params, request, response) {
  await import('../../ui/components/home/SSRHome.jsx').then(
    function(SSRHome) {
      var html = renderOut(SSRHome.default);
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    }
  );
});

SeoRouter.route('/radioblog/:slug', async function(params, request, response) {
  var post = Posts.findOne({ slug: params.slug });
  await import('../../ui/components/news/SSRNewsPage.jsx').then(
    function(SSRNewsPage) {
      var html = renderOut(SSRNewsPage.default(post));
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    }
  );
});

SeoRouter.route('/events/:slug', async function(params, request, response) {
  await import('../../ui/components/parties/SSRPartyPage.jsx').then(
    function(SSRPartyPage) {
      var party = Parties.findOne({ slug: params.slug });
      var html = renderOut(SSRPartyPage.default(party));
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    });
});

SeoRouter.route('/reviews/:slug', async function(params, request, response) {
  await import('../../ui/components/reviews/SSRReviewPage.jsx').then(
    function(SSRReviewPage) {
      var review = Reviews.findOne({ slug: params.slug });
      var html = renderOut(SSRReviewPage.default(review));
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    }
  );
});

SeoRouter.route('/shows/:slug', async function(params, request, response) {
  await import('../../ui/components/shows/SSRShowPage.jsx').then(
    (SSRShowPage) => {
      var show = Shows.findOne({ slug: params.slug });
      var html = renderOut(SSRShowPage.default(show));
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    }
  );
});

SeoRouter.route('/charts/:slug', async function(params, request, response) {
  await import('../../ui/components/charts/SSRChartsPage.jsx').then(
    function(SSRChartsPage) {
      var chart = Charts.findOne({ slug: params.slug });
      var html = renderOut(SSRChartsPage.default(chart));
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    });
});

SeoRouter.route('/profile/:username',
  async function(params, request, response) {
    await import('../../ui/components/profile/SSRProfilePage.jsx').then(
      (SSRProfilePage) => {
        var profile = Profiles.findOne({
          userId: Meteor.users.findOne({ username: params.username })._id });
        var html = renderOut(SSRProfilePage.default(profile));
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.end(html);
      }
    );
  }
);

SeoRouter.route('/alumni', async function(params, request, response){
  await import('../../ui/components/static_pages/Alumni.jsx').then(
    function(Alumni) {
      var html = renderOut(<Alumni.default />);
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    });
});

SeoRouter.route('/about-us', async function(params, request, response) {
  await import('../../ui/components/static_pages/About.jsx').then(
    function(About) {
      var html = renderOut(<About.default />);
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    });
});

SeoRouter.route('/join-ktuh', async function(params, request, response) {
  await import('../../ui/components/static_pages/Join.jsx').then(
    function(Join) {
      var html = renderOut(<Join.default />);
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    });
});

SeoRouter.route('/faq', async function(params, request, response) {
  await import('../../ui/components/static_pages/FAQ.jsx').then(
    function(FAQ) {
      var html = renderOut(<FAQ.default />);
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    });
});

SeoRouter.route('/staff', async function(params, request, response) {
  await import('../../ui/components/static_pages/SSRStaff.jsx').then(
    function(SSRStaff) {
      var html = renderOut(SSRStaff.default);
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    });
});

SeoRouter.route('/timeline', async function(params, request, response) {
  await import('../../ui/components/static_pages/Timeline.jsx').then(
    function(Timeline) {
      var html = renderOut(<Timeline.default />);
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    }
  );
});

SeoRouter.route('/underwriting', async function(params, request, response) {
  await import('../../ui/components/static_pages/Underwriting.jsx').then(
    function(Underwriting) {
      var html = renderOut(<Underwriting.default />);
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    }
  );
});

SeoRouter.route('/contact-us', async function(params, request, response) {
  await import('../../ui/components/static_pages/SSRContact.jsx').then(
    function(SSRContact) {
      var html = renderOut(<SSRContact.default />);
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    }
  );
});

SeoRouter.route('/:slug', async function(params, request, response) {
  await import('../../ui/components/pages/SSRPagesItem.jsx').then(
    function(SSRPagesItem) {
      var html = renderOut(SSRPagesItem.default(params.slug));
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.end(html);
    });
});
