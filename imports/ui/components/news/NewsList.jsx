import React, { Component } from 'react';
import NewsListSidebarSupport from './NewsListSidebarSupport.jsx';
import NewsListLatestReviews from './NewsListLatestReviews.jsx';
import NewsListContent from './NewsListContent.jsx';

export default class NewsList extends Component {
  render() {
    return [
      <h2 className='general__header' key='header-title'>KTUH Radioblog</h2>,
      <div className='news-list__wrapper' key='news-content'>
        <NewsListContent />
        <div className='news-list__sidebar'>
          <NewsListSidebarSupport />
          <NewsListLatestReviews />
        </div>
      </div>
    ];
  }
}
