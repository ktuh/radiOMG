import React, { Component } from 'react';
import { getPathBySlug } from '../../../startup/lib/helpers.js';

export default class NewsListLatestReviewsItem extends Component {
  render() {
    return (
      <div className='news-list__latest-review' key={this.props.review._id}>
        <a href={getPathBySlug('/reviews/:slug', this.props.review.slug)}>
          <img src={this.props.review.image.url} />
          <p><b>{this.props.review.artist}</b></p>
          <p>{this.props.review.releaseName}</p>
        </a>
      </div>
    );
  }
}
