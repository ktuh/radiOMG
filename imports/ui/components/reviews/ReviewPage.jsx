import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Profiles from '../../../api/users/profiles_collection.js';
import Reviews from '../../../api/reviews/reviews_collection.js';
import { moment } from 'meteor/momentjs:moment';
import { displayNameById, usernameById } from '../../../startup/lib/helpers.js';

class ReviewPage extends Component {
  formattedRating(rating) {
    if (rating % 1 !== .5) return Number(rating).toString() + '.0';
    else return rating;
  }

  render() {
    if (this.props.ready)
      return [
        <h1 className="general__header">
          <b>{this.props.review.releaseName}</b>
          <br />{this.props.review.artist}</h1>,
        <div className='review__link'>
          <a href='/reviews' className='back-to'>← all reviews</a>
        </div>,
        <div className="review__content">
          <img className='review-page__image'
            src={this.props.review.thumbnail ||
              (this.props.review.image && this.props.review.image.url)} />
          <div className='review-page__copy'>
            <h4 className='review-page__rating'>
              {this.formattedRating(this.props.review.rating) + ' / 5.0'}</h4>
            <div className='review-page__byline'>
              {'Review by '}
              <a href={'/profile/' + usernameById(this.props.review.userId)}>
                {displayNameById(this.props.review.userId) ||
                  usernameById(this.props.review.userId)}
              </a>
              {' • ' + moment(this.props.review.submitted).fromNow()}
            </div>
            <div className='review-page__body' dangerouslySetInnerHTML=
              {{ __html: this.props.review.body }}/>
          </div>
        </div>
      ];
    else return null;
  }
}

export default withTracker(() => {
  var slug = FlowRouter.getParam('slug');
  var s1 = Meteor.subscribe('singleReview', slug);

  return {
    ready: s1.ready(),
    review: Reviews.findOne({ slug: slug })
  };
})(ReviewPage);
