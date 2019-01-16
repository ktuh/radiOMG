import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HomeContentNewsItem from './HomeContentNewsItem.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import Posts from '../../../api/posts/posts_collection.js';
import { Meteor } from 'meteor/meteor';

class HomeContentNews extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    posts: PropTypes.array
  }

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.ready)
      return (
        <div className='home__news'>
          <a href='/radioblog'>
            <h3 className='home__section'>RADIOBLOG</h3>
          </a>
          <a href='/radioblog' className='home__more'>
            MORE NEWS{'  '}
            <span className='glyphicon glyphicon-arrow-right'></span>
          </a>
          <div className='home__news-content'>
            {this.props.posts.map((item) => (
              <HomeContentNewsItem item={item} />))}
          </div>
        </div>
      );
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('posts'), s2 = Meteor.subscribe('djs'),
    s3 = Meteor.subscribe('djProfiles');

  return {
    ready: s1.ready() && s2.ready() && s3.ready(),
    posts: Posts.find({ featured: false }, {
      limit: 6, sort: { submitted: -1 } }).fetch()
  };
})(HomeContentNews);
