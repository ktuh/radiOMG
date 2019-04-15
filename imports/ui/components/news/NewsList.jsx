import React, { Component } from 'react';
import NewsListSidebarSupport from './NewsListSidebarSupport.jsx';
import NewsListLatestReviews from './NewsListLatestReviews.jsx';
import NewsListContent from './NewsListContent.jsx';
import { Metamorph } from 'react-metamorph';

export default class NewsList extends Component {
  render() {
    return [
      <Metamorph title="Radioblog - KTUH FM Honolulu | Radio for the People"
        description="KTUH Radioblog" image='https://ktuh.org/img/ktuh-logo.jpg'
      />,
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
