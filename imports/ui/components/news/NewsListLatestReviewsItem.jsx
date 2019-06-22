import React from 'react';
import PropTypes from 'prop-types';
import { getPathBySlug } from '../../../startup/lib/helpers.js';

export default function NewsListLatestReviewsItem({ review }) {
  return (
    <div className='news-list__latest-review' key={review._id}>
      <a href={getPathBySlug('/reviews/:slug', review.slug)}>
        <img src={(review.image && review.image.url) ||
          '/mstile-310x310.png'} />
        <p><b>{review.artist}</b></p>
        <p>{review.releaseName}</p>
      </a>
    </div>
  );
}

NewsListLatestReviewsItem.propTypes = {
  review: PropTypes.object
}
