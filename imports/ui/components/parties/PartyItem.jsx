import React from 'react';
import PropTypes from 'prop-types';

export default function PartyItem({ party: {
  title, slug, thumbnail, flyerFront } }) {
  return (
    <div className='events-item'>
      <a href={`/events/${slug}`}>
        <img className='events-item__photo' src={thumbnail || flyerFront.url} />
      </a>
      <p><a href={`/events/${slug}`}>{title}</a></p>
    </div>
  );
}

PartyItem.propTypes = {
  party: PropTypes.object
}
