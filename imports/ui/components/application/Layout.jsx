import React, { useEffect } from 'react';
import { oneOfType, object, func } from 'prop-types';
import Landing from '../home/Landing.jsx';
import Header from '../includes/Header.jsx';
import Footer from '../includes/Footer.jsx';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Banner from '../includes/Banner.jsx';

export default function Layout({ content }) {
  function home() {
    return FlowRouter.getRouteName() === 'home';
  }

  useEffect(function() {
    if (global.player)
      global.player.setSrc('http://stream.ktuh.org:8000/stream-mp3');
  }, [Meteor.isClient]);

  return [
    home() ? <Banner /> : null,
    <div className='container' key='container'>
      {home() && [<Landing key='landing' />,
        <div className='spacer-lg' key='lg'/>] ||
        <div className='spacer-sm' key='sm' />}
      <Header key='header' />
      <script src='/mejs/mediaelement-and-player.min.js'></script>
      <div id='main'>
        {content}
      </div>
    </div>,
    <Footer key='footer' />
  ];
}

Layout.propTypes = {
  content: oneOfType([object, func])
}
