import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Posts from '../../../api/posts/posts_collection.js';
import { usernameById, displayNameById, timeDiffString, renderSummary,
  getPathBySlug } from '../../../startup/lib/helpers.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class NewsFeatured extends Component {
  static propTypes = {
    featuredPost: PropTypes.object,
    ready: PropTypes.bool
  }

  render() {
    var path = getPathBySlug('/radioblog/:slug',
        this.props.featuredPost.slug),
      synopsis = renderSummary(this.props.featuredPost.summary, 60),
      username = this.props.featuredPost.userId ?
        usernameById(this.props.featuredPost.userId) : undefined,
      displayName = displayNameById(this.props.featuredPost.userId),
      timeDiff = timeDiffString(this.props.featuredPost.submitted);

    if (this.props.ready && this.props.featuredPost)
      return (
        <div className='news-list__featured'>
          <div className='news-list__featured-img'>
            <img src=
              {this.props.featuredPost.thumbnail ||
              (this.props.featuredPost.photo &&
              this.props.featuredPost.photo.url) || '/mstile-310x310.png'} />
            <span className='purple-tag'>Featured</span>
          </div>
          <div className='news-list__featured-item'>
            <a href={`/radioblog/${this.props.featuredPost.slug}`}>
              <h2 className='news-list__featured-title'>
                {this.props.featuredPost.title}
              </h2>
            </a>
            <p>{synopsis + '  '}
              <a className='purple-text' href={path}>
                <i>Read On</i>
              </a>
            </p>
            <p className='news-list__byline'>{'by '}
              {username ? <a href={`/profile/${username}`}>
                {displayName || username}</a> :
                this.props.featuredPost.author}{' / '}
              {timeDiff}</p>
          </div>
        </div>
      );
    else return null;
  }
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
