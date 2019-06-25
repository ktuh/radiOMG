import React from 'react';
import PropTypes from 'prop-types';
import { displayNameById, usernameById, timeDiffString, renderSummary,
  getPathBySlug } from '../../../startup/lib/helpers.js';

export default function NewsItem({ item: {
  slug, body, summary, userId, category, submitted, thumbnail, photo, title,
  author
} }) {
  var path = getPathBySlug('/radioblog/:slug', slug),
    synopsis = summary.length ?
      renderSummary(summary, 60) : renderSummary(body, 60),
    username = usernameById(userId),
    displayName = displayNameById(userId),
    timeDiff = timeDiffString(submitted);

  return (
    <div className='news-list__post'>
      <div className='news-list__post-image'>
        <span className='purple-tag'>{category}</span>
        <a className="news-list__photo-link"
          href={path}>
          <img className='news-list__photo'
            src={thumbnail || (photo && photo.url) || '/mstile-310x310.png'} />
        </a>
      </div>
      <div className='news-list__info'>
        <a className='news-list__title'
          href={path}>
          <h3>{title}</h3>
        </a>
        <p className='news-list__excerpt'>
          {synopsis}
          {'  '}
          <a className='purple-text' href={path}>
            <i>Read On</i>
          </a>
        </p>
        <br />
        <p className='news-list__byline'>by{' '}
          {username ? <a href={`/profile/${username}`}>
            {displayName}</a> : author}{' / '}
          {timeDiff}
        </p>
      </div>
    </div>
  );
}

NewsItem.propTypes = {
  item: PropTypes.object
}
