import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewsListLatestReviewsItem from './NewsListLatestReviewsItem.jsx';
import Reviews from '../../../api/reviews/reviews_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class NewsListLatestReviews extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    reviews: PropTypes.array
  }

  render() {
    if (this.props.ready && this.props.reviews.length > 0) return (
      <div className='news-list__latest-reviews'>
        <h4>LATEST REVIEWS</h4>
        {this.props.reviews.map((review) => (
          <NewsListLatestReviewsItem review={review} key={review._id} />))}
      </div>
    );
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('reviewsLimited',
    { limit: 6, sort: { submitted: -1 } });

  return {
    ready: s1.ready(),
    reviews: Reviews.find({}).fetch() || []
  };
})(NewsListLatestReviews);
