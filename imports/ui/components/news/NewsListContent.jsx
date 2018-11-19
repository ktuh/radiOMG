import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import NewsItem from './NewsItem.jsx';
import NewsFeatured from './NewsFeatured.jsx';
import Posts from '../../../api/posts/posts_collection.js';
import { pages } from '../../../startup/lib/helpers.js';
import CustomPaginator from '../reusables/CustomPaginator.jsx';

class NewsListContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
  }

  handleClick(page) {
    this.setState({ currentPage: page });
  }

  handlePreviousClick(event) {
    this.setState({ currentPage: this.state.currentPage - 1 });
  }

  handleNextClick(event) {
    this.setState({ currentPage: this.state.currentPage + 1 });
  }

  render() {
    var handleClick = this.handleClick.bind(this),
      handleNextClick = this.handleNextClick.bind(this),
      handlePreviousClick = this.handlePreviousClick.bind(this),
      self = this;

    if (this.props.ready) {
      return (
        <div className='news-list__content'>
          <div className='news-list'>
            <NewsFeatured />
            {(this.props.pages)[this.state.currentPage - 1].map((post) =>
              <NewsItem post={post} key={post._id} />)}
            <div className='news-list__paginator'>
              <CustomPaginator currentPage={this.state.currentPage}
                pages={this.props.pages} handleClick={handleClick}
                handleNextClick={handleNextClick}
                handlePreviousClick={handlePreviousClick} />
            </div>
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
    s3 = Meteor.subscribe('djProfiles');

  var featuredPost = Posts.findOne({ approved: true, featured: true },
    { sort: { submitted: -1 } });

  return {
    ready: s1.ready() && s2.ready() && s3.ready(),
    pages: pages(Posts.find((s2.ready() && { _id:
       { $ne: featuredPost._id }, approved: true } || null) ||
       (!s2.ready && { approved: true } || null)).fetch(), 4)
  };
})(NewsListContent);
