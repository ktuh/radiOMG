import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HomeContentReviewsItem extends Component {
  static propTypes = {
    item: PropTypes.object
  }

  render() {
    return (
      <div key={this.props.item._id} className='home__reviews-item'>
        <a href={'/reviews/' + this.props.item.slug}>
          <img className='home__reviews-img'
            src={this.props.item.thumbnail ||
            (this.props.item.image && this.props.item.image.url) ||
            '/mstile-310x310.png'} />
          <p className='home__title'>{this.props.item.artist}</p>
          <p className='home__subtitle'>{this.props.item.releaseName}</p>
        </a>
      </div>
    );
  }
}
