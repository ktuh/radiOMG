import React from 'react';
import PropTypes from 'prop-types';
import { renderSummary, usernameById, displayNameById, timeDiffString }
  from '../../../startup/lib/helpers.js';

export default function HomeContentNewsItem({ item }) {
  var { slug, thumbnail, photo, title, summary, body, userId, author,
    submitted } = item;
  return <div className='home__news-item'>
    <a href={`/radioblog/${slug}`}>
      <img className='home__news-img'
        src={thumbnail || (photo && photo.url) || '/mstile-310x310.png'} />
      <h4 className='home__title'>{title}</h4>
    </a>
    <p className='home__synopsis'>
      {renderSummary((summary && summary.length) ? summary : body, 40)}
    </p>
    <p className='home__byline'>
      by {userId ?
        <a href={`/profile/${usernameById(userId)}`}>
          {displayNameById(userId)}
        </a> : author} / {timeDiffString(submitted)}
    </p>
  </div>;
}

HomeContentNewsItem.propTypes = {
  item: PropTypes.object
}
