import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import NewsItem from './NewsItem.jsx';
import NewsFeatured from './NewsFeatured.jsx';
import Posts from '../../../api/posts/posts_collection.js';
import EverAfter from 'react-everafter';

class NewsListContent extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    posts: PropTypes.array
  }

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.ready) {
      return (
        <div className='news-list__content'>
          <div className='news-list'>
            <NewsFeatured />
            <EverAfter.Paginator wrapper={NewsItem} perPage={4}
              items={this.props.posts} truncate={true} />
          </div>
        </div>
      );
    }
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('posts'),
    s2 = Meteor.subscribe('latestFeaturedPost'),
    s3 = Meteor.subscribe('djs'),
    s4 = Meteor.subscribe('djProfiles');

  var featuredPost = Posts.findOne({ approved: true, featured: true },
    { sort: { submitted: -1 } });

  return {
    ready: s1.ready() && s2.ready() && s3.ready() && s4.ready(),
    posts: Posts.find((s2.ready() && featuredPost && { _id:
       { $ne: featuredPost._id }, approved: true } || { approved: true }),
    { sort: { submitted: -1 } }).fetch()
  };
})(NewsListContent);
