import React, { Component } from 'react';

export default class HomeContentReviewsItem extends Component {
  render() {
    return (
      <div key={this.props.item._id} className='home__reviews-item'>
        <a href={'/reviews/' + this.props.item.slug}>
          <img className='home__reviews-img'
            src={this.props.item.humbnail || this.props.item.image.url} />
          <p className='home__title'>{this.props.item.artist}</p>
          <p className='home__subtitle'>{this.props.item.releaseName}</p>
        </a>
      </div>
    );
  }
}
