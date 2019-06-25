import React from 'react';
import PropTypes from 'prop-types';
import Posts from '../../../api/posts/posts_collection.js';
import { usernameById, displayNameById, timeDiffString, renderSummary,
  getPathBySlug } from '../../../startup/lib/helpers.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

function NewsFeatured({ featuredPost, ready }) {
  if (ready && featuredPost) {
    var path = getPathBySlug('/radioblog/:slug', featuredPost.slug),
      synopsis = renderSummary(featuredPost.summary, 60),
      username = featuredPost.userId ?
        usernameById(featuredPost.userId) : undefined,
      displayName = displayNameById(featuredPost.userId),
      timeDiff = timeDiffString(featuredPost.submitted);

    return (
      <div className='news-list__featured'>
        <div className='news-list__featured-img'>
          <img src=
            {featuredPost.thumbnail || (featuredPost.photo &&
            featuredPost.photo.url) || '/mstile-310x310.png'} />
          <span className='purple-tag'>Featured</span>
        </div>
        <div className='news-list__featured-item'>
          <a href={`/radioblog/${featuredPost.slug}`}>
            <h2 className='news-list__featured-title'>
              {featuredPost.title}
            </h2>
          </a>
          <p>{`${synopsis}  `}
            <a className='purple-text' href={path}>
              <i>Read On</i>
            </a>
          </p>
          <p className='news-list__byline'>{'by '}
            {username ? <a href={`/profile/${username}`}>
              {displayName || username}</a> : featuredPost.author}{' / '}
            {timeDiff}</p>
        </div>
      </div>
    );
  }
  else return null;
}

NewsFeatured.propTypes = {
  featuredPost: PropTypes.object,
  ready: PropTypes.bool
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('latestFeaturedPost', {
    onReady: function() {
      var latestFeaturedPost =
        Posts.findOne({ approved: true, featured: true },
          { sort: { submitted: -1 } });

      if (latestFeaturedPost)
        Meteor.subscribe('profileData', latestFeaturedPost.userId);
    }
  });

  return {
    ready: s1.ready(),
    featuredPost: Posts.findOne({ approved: true, featured: true },
      { sort: { submitted: -1 } })
  };
})(NewsFeatured);
