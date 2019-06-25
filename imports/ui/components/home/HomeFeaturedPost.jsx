import React from 'react';
import { bool, object } from 'prop-types';
import { renderSummary } from '../../../startup/lib/helpers.js';
import { withTracker } from 'meteor/react-meteor-data';
import Posts from '../../../api/posts/posts_collection.js';
import { Meteor } from 'meteor/meteor';

function HomeFeaturedPost({ ready, post }) {
  if (ready && post) {
    var { thumbnail, photo, category, slug, title, summary } = post
    return <div className='home__featured'>
      <div className='home__featured-content'>
        <div className='home__featured-photo'>
          <span className='purple-tag'>Featured</span>
          <img className='home__featured-img'
            src={thumbnail || (photo && photo.url) ||
            '/mstile-310x310.png'} /></div>
        <div className='home__featured-item'>
          <p className='home__featured-category'>{category}</p>
          <a href={`/radioblog/${slug}`}>
            <h3 className='home__title'>{title}</h3></a>
          <p className='home__synopsis'>{renderSummary(summary, 100)}</p>
        </div>
      </div>
    </div>;
  }
  else return null;
}

HomeFeaturedPost.propTypes = {
  ready: bool,
  post: object
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('latestFeaturedPost');

  return {
    ready: s1.ready(),
    post: Posts.findOne({
      approved: true, featured: true
    }, {
      sort: { submitted: -1 }
    })
  };
})(HomeFeaturedPost);
