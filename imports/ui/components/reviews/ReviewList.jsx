import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReviewItem from './ReviewItem.jsx';
import Reviews from '../../../api/reviews/reviews_collection.js';
import { Meteor } from 'meteor/meteor';
import { pages } from '../../../startup/lib/helpers.js';
import CustomPaginator from '../reusables/CustomPaginator.jsx';
import { Helmet } from 'react-helmet';

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  handleClick(event) {
    var self = this;
    return function (page) {
      self.setState({ currentPage: page });
    };
  }

  handlePreviousClick(event) {
    this.setState({ currentPage: this.state.currentPage - 1 });
  }

  handleNextClick(event) {
    this.setState({ currentPage: this.state.currentPage + 1 });
  }

  render() {
    var self = this, handleClick = this.handleClick.bind(this),
      handleNextClick = this.handleNextClick.bind(this),
      handlePreviousClick = this.handlePreviousClick.bind(this);

    if (this.props.ready) {
      return [
        <Helmet key="metadata">
          <title>
            Reviews - KTUH FM Honolulu | Radio for the People</title>
          <meta property="og:title"
            content="Reviews - KTUH FM Honolulu | Radio for the People"
          />
          <meta property="og:description" content="KTUH Reviews" />
          <meta name="twitter:title" content={'Reviews' +
            ' - KTUH FM Honolulu | Radio for the People'} />
          <meta name="twitter:url" content="https://ktuh.org" />
          <meta name="twitter:description" content="KTUH Reviews" />
          <meta name="twitter:site" content="@ktuh_fm" />
          <meta name="twitter:image" content={
            'https://ktuh.org/img/ktuh-logo.jpg'} />
          <meta name="twitter:creator" content="@ktuh_fm" />
          <meta property="description" content="KTUH Reviews" />
        </Helmet>,
        <h2 className="general__header" key="header-title">Reviews</h2>,
        <div className="reviews__content" key="reviews-content">
          {(this.props.pages)[this.state.currentPage - 1].map((review) =>
            <ReviewItem review={review} key={review._id} />)}
          <div className='news-list__paginator'>
            <CustomPaginator currentPage={this.state.currentPage}
              pages={this.props.pages} handleClick={handleClick}
              handleNextClick={handleNextClick}
              handlePreviousClick={handlePreviousClick} />
          </div>
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
    pages: pages(Reviews.find({ approved: true },
      { sort: { submitted: -1 } }).fetch(), 8)
  };
})(ReviewList);
