import React from 'react';
import PropTypes from 'prop-types';

export default function ReviewItem({ item: {
  slug, thumbnail, image, artist, releaseName
} }){
  return (
    <div className='review-item'>
      <a href={`/reviews/${slug}`}>
        <img className='review-item__image'
          src={thumbnail || (image && image.url) ||
            '/mstile-310x310.png'} />
        <div className='review-item__release'>
          {releaseName}
        </div>
        <div className='review-item__artist'>
          {artist}
        </div>
      </a>
    </div>
  );
}

ReviewItem.propTypes = {
  item: PropTypes.object
}
