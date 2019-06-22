import React from 'react';
import HomeSidebarDJ from './HomeSidebarDJ.jsx';
import HomeSidebarNext from './HomeSidebarNext.jsx';

export default function HomeSidebar() {
  return (
    <div className='home__sidebar'>
      <HomeSidebarNext />
      <HomeSidebarDJ />
    </div>
  );
}
