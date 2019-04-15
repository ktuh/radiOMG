import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderSummary } from '../../../startup/lib/helpers.js';
import { withTracker } from 'meteor/react-meteor-data';
import Posts from '../../../api/posts/posts_collection.js';
import { Meteor } from 'meteor/meteor';

class HomeFeaturedPost extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    post: PropTypes.object
  }

  render() {
    if (this.props.ready && this.props.post) return (
      <div className='home__featured'>
        <div className='home__featured-content'>
          <div className='home__featured-photo'>
            <span className='purple-tag'>Featured</span>
            <img className='home__featured-img'
              src={this.props.post.thumbnail ||
              (this.props.post.photo && this.props.post.photo.url) ||
              '/mstile-310x310.png'} />
          </div>
          <div className='home__featured-item'>
            <p className='home__featured-category'>
              {this.props.post.category}
            </p>
            <a href={'/radioblog/' + this.props.post.slug}>
              <h3 className='home__title'>{this.props.post.title}</h3>
            </a>
            <p className='home__synopsis'>
              {renderSummary(this.props.post.summary, 100)}
            </p>
          </div>
        </div>
      </div>
    );
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('latestFeaturedPost');

  return {
    ready: s1.ready(),
    post: Posts.findOne({
      approved: true, featured: true
    }, {
      sort: { submitted: -1 }
    })
  };
})(HomeFeaturedPost);
