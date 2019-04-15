import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import ReviewItem from './ReviewItem.jsx';
import Reviews from '../../../api/reviews/reviews_collection.js';
import { Meteor } from 'meteor/meteor';
import EverAfter from 'react-everafter';
import { Metamorph } from 'react-metamorph';

class ReviewList extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    reviews: PropTypes.arrayOf(PropTypes.object)
  }

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.ready) {
      return [
        <Metamorph title="Reviews - KTUH FM Honolulu | Radio for the People"
          description="KTUH Reviews" image='https://ktuh.org/img/ktuh-logo.jpg'
        />,
        <h2 className="general__header" key="header-title">Reviews</h2>,
        <div className="reviews__content" key="reviews-content">
          <EverAfter.Paginator wrapper={ReviewItem} perPage={8}
            items={this.props.reviews} />
        </div>
      ];
    }
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('approvedReviews');

  return {
    ready: s1.ready(),
    reviews: Reviews.find({ approved: true },
      { sort: { submitted: -1 } }).fetch()
  };
})(ReviewList);
