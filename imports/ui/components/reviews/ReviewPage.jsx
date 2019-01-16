import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Reviews from '../../../api/reviews/reviews_collection.js';
import { moment } from 'meteor/momentjs:moment';
import { displayNameById, usernameById } from '../../../startup/lib/helpers.js';
import { Metamorph } from 'react-metamorph';
import { FlowRouter } from 'meteor/kadira:flow-router';

class ReviewPage extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    review: PropTypes.object
  }

  formattedRating(rating) {
    if (rating % 1 !== .5) return Number(rating).toString() + '.0';
    else return rating;
  }

  render() {
    if (this.props.ready)
      return [
        <Metamorph title={'Review of "' + this.props.review.releaseName +
          '" by ' + this.props.review.artist + ' - KTUH FM Honolulu | ' +
        'Radio for the People'} description={'Review of ' +
          this.props.review.releaseName + ' by ' + this.props.review.artist}
        image={this.props.review.thumbnail ||
          'https://ktuh.org/img/ktuh-logo.jpg'} />,
        <h1 className="general__header" key='header'>
          <b>{this.props.review.releaseName}</b>
          <br />{this.props.review.artist}</h1>,
        <div className='review__link' key='back-link'>
          <a href='/reviews' className='back-to'>← all reviews</a>
        </div>,
        <div className="review__content" key='review-content'>
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
  var s1 = Meteor.subscribe('singleReview', slug, {
    onReady: function() {
      var review = Reviews.findOne({ slug: slug });
      if (!review) {
        FlowRouter.go('/not-found');
        return;
      }
    }
  });

  return {
    ready: s1.ready(),
    review: Reviews.findOne({ slug: slug })
  };
})(ReviewPage);
