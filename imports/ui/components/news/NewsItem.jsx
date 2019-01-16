import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { displayNameById, usernameById, timeDiffString, renderSummary,
  getPathBySlug } from '../../../startup/lib/helpers.js';

export default class NewsItem extends Component {
  static propTypes = {
    item: PropTypes.object
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    var path = getPathBySlug('/radioblog/:slug', this.props.item.slug),
      synopsis = this.props.item.summary.length > 0 ?
        renderSummary(this.props.item.summary, 60) :
        renderSummary(this.props.item.body, 60),
      username = usernameById(this.props.item.userId),
      displayName = displayNameById(this.props.item.userId),
      timeDiff = timeDiffString(this.props.item.submitted);

    return (
      <div className='news-list__post'>
        <div className='news-list__post-image'>
          <span className='purple-tag'>{this.props.item.category}</span>
          <a className="news-list__photo-link"
            href={path}>
            <img className='news-list__photo'
              src={this.props.item.thumbnail ||
              (this.props.item.photo && this.props.item.photo.url) ||
              '/mstile-310x310.png'} />
          </a>
        </div>
        <div className='news-list__info'>
          <a className='news-list__title'
            href={path}>
            <h3>{this.props.item.title}</h3>
          </a>
          <p className='news-list__excerpt'>
            {synopsis}
            {'  '}
            <a className='purple-text' href={path}>
              <i>Read On</i>
            </a>
          </p>
          <br />
          <p className='news-list__byline'>by{' '}
            {username ? <a href={`/profile/${username}`}>
              {displayName}</a> : this.props.item.author}{' / '}
            {timeDiff}
          </p>
        </div>
      </div>
    );
  }
}
