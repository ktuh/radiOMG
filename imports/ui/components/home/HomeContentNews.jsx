import React, { Component } from 'react';
import HomeContentNewsItem from './HomeContentNewsItem.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import Posts from '../../../api/posts/posts_collection.js';

class HomeContentNews extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var self = this;
    if (this.props.ready)
      return (
        <div className='home__news'>
          <a href='/radioblog' key='radioblog-link'>
            <h3 className='home__section'>RADIOBLOG</h3>
          </a>
          <a href='/radioblog' className='home__more' key='home-more'>
            MORE NEWS{'  '}
            <span className='glyphicon glyphicon-arrow-right'></span>
          </a>
          <div className='home__news-content' key='home_news'>
            {self.props.posts.map((item) => (
              <HomeContentNewsItem item={item} />))}
          </div>
        </div>
      );
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('postsLimited',
      { limit: 6, sort: { submitted: -1 } }),
    s2 = Meteor.subscribe('djs'), s3 = Meteor.subscribe('djProfiles');

  return {
    ready: s1.ready() && s2.ready() && s3.ready(),
    posts:
      Posts.find({ featured: false }, { sort: { submitted: -1 } }).fetch()
  };
})(HomeContentNews);
