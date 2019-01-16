import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Reviews from '../../../api/reviews/reviews_collection.js';
import HomeContentReviewsItem from './HomeContentReviewsItem.jsx';
import { Meteor } from 'meteor/meteor';

class HomeContentReviews extends Component {
  static propTypes = {
    reviews: PropTypes.array
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='home__reviews'>
        <a href='/reviews' key='reviews-link'>
          <h3 className="home__section">MUSIC REVIEWS</h3>
        </a>
        <a href='/reviews' className='home__more' key='reviews-more'>
          MORE REVIEWS{'  '}
          <span className='glyphicon glyphicon-arrow-right'></span>
        </a>
        <div className='home__reviews-content' key='reviews-content'>
          {this.props.reviews.map((item) => (
            <HomeContentReviewsItem item={item} />))}
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('reviewsLimited',
    { limit: 6, sort: { submitted: -1 } });

  return {
    ready: s1.ready(),
    reviews: Reviews.find({ approved: true },
      { sort: { submitted: -1 } }).fetch()
  };
})(HomeContentReviews);
