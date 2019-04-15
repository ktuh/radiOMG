import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPathBySlug } from '../../../startup/lib/helpers.js';

export default class NewsListLatestReviewsItem extends Component {
  static propTypes = {
    review: PropTypes.object
  }

  render() {
    return (
      <div className='news-list__latest-review' key={this.props.review._id}>
        <a href={getPathBySlug('/reviews/:slug', this.props.review.slug)}>
          <img src={(this.props.review.image && this.props.review.image.url) ||
            '/mstile-310x310.png'} />
          <p><b>{this.props.review.artist}</b></p>
          <p>{this.props.review.releaseName}</p>
        </a>
      </div>
    );
  }
}
