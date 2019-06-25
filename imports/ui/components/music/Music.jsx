import React from 'react';
import MusicCharts from './MusicCharts.jsx';
import MusicPlaylists from './MusicPlaylists.jsx';

export default function Music() {
  return <div className="music__content">
    <MusicPlaylists />
    <MusicCharts />
  </div>;
}
