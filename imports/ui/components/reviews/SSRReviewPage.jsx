import React, { Component } from 'react';
import Profiles from '../../../api/users/profiles_collection.js';
import Reviews from '../../../api/reviews/reviews_collection.js';
import { moment } from 'meteor/momentjs:moment';
import { displayNameById, usernameById } from '../../../startup/lib/helpers.js';
import { Helmet } from 'react-helmet';

class SSRReviewPage extends Component {
  formattedRating(rating) {
    if (rating % 1 !== .5) return Number(rating).toString() + '.0';
    else return rating;
  }

  render() {
    return [
      <Helmet key="metadata">
        <title>
          {'Review of "' + this.props.review.releaseName + '" by ' +
          this.props.review.artist + ' - KTUH FM Honolulu | ' +
          'Radio for the People'}
        </title>
        <meta property="og:title"
          content={'Review of "' + this.props.review.releaseName + '" by ' +
          this.props.review.artist + ' - KTUH FM Honolulu | ' +
          'Radio for the People'}
        />
        <meta property="og:description" content={
          'Review of ' + this.props.review.releaseName + ' by ' +
          this.props.review.artist} />
        <meta name="twitter:title" content={'Review of "' +
          this.props.review.releaseName + '" by ' +
          this.props.review.artist + ' - KTUH FM Honolulu | ' +
          'Radio for the People'} />
        <meta name="twitter:url" content="https://ktuh.org" />
        <meta name="twitter:description" content={
          'Review of "' + this.props.review.releaseName + '" by ' +
          this.props.review.artist} />
        <meta name="twitter:site" content="@ktuh_fm" />
        <meta name="twitter:image" content={
          this.props.review.thumbnail ||
          'https://ktuh.org/img/ktuh-logo.jpg'} />
        <meta name="twitter:creator" content="@ktuh_fm" />
        <meta property="description" content={
          'Review of "' + this.props.review.releaseName + '" by ' +
          this.props.review.artist} />
      </Helmet>,
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
  }
}

export default (review) => <SSRReviewPage review={review} />;
