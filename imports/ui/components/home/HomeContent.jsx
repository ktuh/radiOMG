import React from 'react';
import HomeContentNews from './HomeContentNews.jsx';
import HomeContentReviews from './HomeContentReviews.jsx';
import HomeSidebar from './HomeSidebar.jsx';

export default function HomeContent () {
  return <div className='content'>
    <div className='home__main'>
      <HomeContentNews />
      <HomeContentReviews />
    </div>
    <HomeSidebar />
  </div>;
}
