import React, { Component } from 'react';
import HomeSidebarDJ from './HomeSidebarDJ.jsx';
import HomeSidebarNext from './HomeSidebarNext.jsx';

export default class HomeSidebar extends Component {
  render() {
    return (
      <div className='home__sidebar'>
        <HomeSidebarNext />
        <HomeSidebarDJ />
      </div>
    );
  }
}
