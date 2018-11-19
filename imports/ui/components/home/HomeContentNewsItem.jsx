import React, { Component } from 'react';
import { renderSummary, usernameById, displayNameById, timeDiffString }
  from '../../../startup/lib/helpers.js';

export default class HomeContentNewsItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='home__news-item' key={this.props.item._id}>
        <a href={'/radioblog/' + this.props.item.slug}>
          <img className='home__news-img'
            src={this.props.item.thumbnail ||
            (this.props.item.photo && this.props.item.photo.url) ||
              '/mstile-310x310.png'} />
          <h4 className='home__title'>{this.props.item.title}</h4>
        </a>
        <p className='home__synopsis'>
          {renderSummary(this.props.item.summary, 40)}
        </p>
        <p className='home__byline'>
          by <a href={'/profile/' + usernameById(this.props.item.userId)}>
            {displayNameById(this.props.item.userId)}
          </a> / {timeDiffString(this.props.item.submitted)}
        </p>
      </div>
    );
  }
}
