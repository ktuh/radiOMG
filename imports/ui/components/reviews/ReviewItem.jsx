import React, { Component } from 'react';

export default class ReviewItem extends Component {
  render() {
    return (
      <div className='review-item'>
        <a href={'/reviews/' + this.props.review.slug}>
          <img className='review-item__image'
            src={this.props.review.thumbnail ||
              (this.props.review.image && this.props.review.image.url)} />
          <div className='review-item__release'>
            {this.props.review.releaseName}
          </div>
          <div className='review-item__artist'>
            {this.props.review.artist}
          </div>
        </a>
      </div>
    );
  }
}
