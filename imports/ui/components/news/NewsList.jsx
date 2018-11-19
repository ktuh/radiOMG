import React, { Component } from 'react';
import NewsListSidebarSupport from './NewsListSidebarSupport.jsx';
import NewsListLatestReviews from './NewsListLatestReviews.jsx';
import NewsListContent from './NewsListContent.jsx';
import { Helmet } from 'react-helmet';

export default class NewsList extends Component {
  render() {
    return [
      <Helmet key="metadata">
        <title>Radioblog - KTUH FM Honolulu | Radio for the People</title>
        <meta property="og:title"
          content="Radioblog - KTUH FM Honolulu | Radio for the People" />
        <meta property="og:description" content="KTUH Radioblog" />
        <meta name="twitter:title" content={'Radioblog' +
          ' - KTUH FM Honolulu | Radio for the People'} />
        <meta name="twitter:url" content="https://ktuh.org" />
        <meta name="twitter:description" content="KTUH Radioblog" />
        <meta name="twitter:site" content="@ktuh_fm" />
        <meta name="twitter:image" content={
          'https://ktuh.org/img/ktuh-logo.jpg'
        } />
        <meta name="twitter:creator" content="@ktuh_fm" />
        <meta property="description" content="KTUH Radioblog" />
      </Helmet>,
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
