import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ReviewItem extends Component {
  static propTypes = {
    item: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='review-item'>
        <a href={'/reviews/' + this.props.item.slug}>
          <img className='review-item__image'
            src={this.props.item.thumbnail ||
              (this.props.item.image && this.props.item.image.url) ||
              '/mstile-310x310.png'} />
          <div className='review-item__release'>
            {this.props.item.releaseName}
          </div>
          <div className='review-item__artist'>
            {this.props.item.artist}
          </div>
        </a>
      </div>
    );
  }
}
