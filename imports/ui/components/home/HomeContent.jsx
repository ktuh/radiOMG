import React, { Component } from 'react';
import HomeContentNews from './HomeContentNews.jsx';
import HomeContentReviews from './HomeContentReviews.jsx';
import HomeSidebar from './HomeSidebar.jsx';

export default class HomeContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='content'>
        <div className='home__main'>
          <HomeContentNews />
          <HomeContentReviews />
        </div>
        <HomeSidebar />
      </div>
    );
  }
}
