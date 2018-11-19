import React, { Component } from 'react';
import MusicCharts from './MusicCharts.jsx';
import MusicPlaylists from './MusicPlaylists.jsx';

export default class Music extends Component {
  render() {
    return (
      <div className="music__content">
        <MusicPlaylists />
        <MusicCharts />
      </div>
    );
  }
}
