import React, { Component } from 'react';
import { displayNameById, usernameById, timeDiffString, renderSummary,
  getPathBySlug } from '../../../startup/lib/helpers.js';

export default class NewsItem extends Component {
  render() {
    var path = getPathBySlug('/radioblog/:slug', this.props.post.slug),
      synopsis = renderSummary(this.props.post.summary, 60),
      username = usernameById(this.props.post.userId),
      displayName = displayNameById(this.props.post.userId),
      timeDiff = timeDiffString(this.props.post.submitted);

    return (
      <div className='news-list__post'>
        <div className='news-list__post-image'>
          <span className='purple-tag'>{this.props.post.category}</span>
          <a className="news-list__photo-link"
            href={path}>
            <img className='news-list__photo'
              src={this.props.post.thumbnail ||
              (this.props.post.photo && this.props.post.photo.url) ||
              '/mstile-310x310.png'} />
          </a>
        </div>
        <div className='news-list__info'>
          <a className='news-list__title'
            href={path}>
            <h3>{this.props.post.title}</h3>
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
            <a href={`/profile/${username}`}>
              {displayName}</a>{' / '}
            {timeDiff}
          </p>
        </div>
      </div>
    );
  }
}
