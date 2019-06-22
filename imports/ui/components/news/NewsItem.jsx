import React from 'react';
import PropTypes from 'prop-types';
import { displayNameById, usernameById, timeDiffString, renderSummary,
  getPathBySlug } from '../../../startup/lib/helpers.js';

export default function NewsItem({ item }) {
  var path = getPathBySlug('/radioblog/:slug', item.slug),
    synopsis = item.summary.length ?
      renderSummary(item.summary, 60) : renderSummary(item.body, 60),
    username = usernameById(item.userId),
    displayName = displayNameById(item.userId),
    timeDiff = timeDiffString(item.submitted);

  return (
    <div className='news-list__post'>
      <div className='news-list__post-image'>
        <span className='purple-tag'>{item.category}</span>
        <a className="news-list__photo-link"
          href={path}>
          <img className='news-list__photo'
            src={item.thumbnail ||
            (item.photo && item.photo.url) ||
            '/mstile-310x310.png'} />
        </a>
      </div>
      <div className='news-list__info'>
        <a className='news-list__title'
          href={path}>
          <h3>{item.title}</h3>
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
            {displayName}</a> : item.author}{' / '}
          {timeDiff}
        </p>
      </div>
    </div>
  );
}

NewsItem.propTypes = {
  item: PropTypes.object
}
