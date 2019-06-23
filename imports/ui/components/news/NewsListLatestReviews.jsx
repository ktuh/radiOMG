import React from 'react';
import PropTypes from 'prop-types';
import NewsListLatestReviewsItem from './NewsListLatestReviewsItem.jsx';
import Reviews from '../../../api/reviews/reviews_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

function NewsListLatestReviews({ ready, reviews }) {
  if (ready && reviews.length) return (
    <div className='news-list__latest-reviews'>
      <h4>LATEST REVIEWS</h4>
      {reviews.map((review) => (
        <NewsListLatestReviewsItem review={review} key={review._id} />))}
    </div>
  );
  else return null;
}

NewsListLatestReviews.propTypes = {
  ready: PropTypes.bool,
  reviews: PropTypes.array
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('reviewsLimited',
    { limit: 6, sort: { submitted: -1 } });

  return {
    ready: s1.ready(),
    reviews: Reviews.find({}).fetch() || []
  };
})(NewsListLatestReviews);
