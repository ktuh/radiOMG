import React from 'react';
import PropTypes from 'prop-types';
import { default as moment } from 'moment';
import { displayNameById, usernameById } from '../../../startup/lib/helpers.js';
import { Metamorph } from 'react-metamorph';

function SSRReviewPage({ review, rating }) {
  function formattedRating(rating) {
    if (rating % 1 !== .5) return `${Number(rating).toString()}.0`;
    else return rating;
  }

  var { releaseName, artist, thumbnail, image, userId, submitted, body } =
    review;

  return [
    <Metamorph title={`Review of "${releaseName
    }" by ${artist} - KTUH FM Honolulu | Radio for the People`}
    description={`Review of ${releaseName} by ${artist}`}
    image={thumbnail ||
      'https://ktuh.org/img/ktuh-logo.jpg'} />,
    <h1 className="general__header" key="header">
      <b>{releaseName}</b>
      <br />{artist}</h1>,
    <div className='review__link' key="back-link">
      <a href='/reviews' className='back-to'>← all reviews</a>
    </div>,
    <div className="review__content" key="review-content">
      <img className='review-page__image'
        src={thumbnail || (image && image.url)} />
      <div className='review-page__copy'>
        <h4 className='review-page__rating'>
          {`${formattedRating(rating)} / 5.0`}</h4>
        <div className='review-page__byline'>
          {'Review by '}
          <a href={`/profile/${usernameById(userId)}`}>
            {displayNameById(userId) || usernameById(userId)}
          </a>
          {` • ${moment(submitted).fromNow()}`}
        </div>
        <div className='review-page__body' dangerouslySetInnerHTML=
          {{ __html: body }}/>
      </div>
    </div>
  ];
}

SSRReviewPage.propTypes = {
  review: PropTypes.object
}

export default (review) => <SSRReviewPage review={review} />;
