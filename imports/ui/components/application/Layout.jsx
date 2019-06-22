import React, { useEffect } from 'react';
import { object } from 'prop-types';
import Landing from '../home/Landing.jsx';
import Header from '../includes/Header.jsx';
import Footer from '../includes/Footer.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Banner from '../includes/Banner.jsx';
import { Blaze } from 'meteor/gadicc:blaze-react-component';
import './blaze_layout.js';

export default function Layout({ content }) {
  function home() {
    return FlowRouter.getRouteName() === 'home';
  }

  useEffect(function() {
    global.player.setSrc('http://stream.ktuh.org:8000/stream-mp3');
  }, []);

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
    <Footer key='footer' />,
    ['atResetPwd', 'atSignIn'].includes(FlowRouter._current.route.name) ?
      <Blaze template="layout" /> : null
  ];
}

Layout.propTypes = {
  content: object
}
