import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Landing from '../home/Landing.jsx';
import Header from '../includes/Header.jsx';
import Footer from '../includes/Footer.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Banner from '../includes/Banner.jsx';

export default class Layout extends Component {
  static propTypes = {
    content: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  home() {
    return FlowRouter.getRouteName() === 'home';
  }

  componentDidMount() {
    player.setSrc('http://stream.ktuh.org:8000/stream-mp3');
  }

  render() {
    return [
      this.home() ? <Banner /> : null,
      <div className='container' key='container'>
        {this.home() && [<Landing key='landing' />,
          <div className='spacer-lg' key='lg'/>] ||
          <div className='spacer-sm' key='sm' />}
        <Header key='header' />
        <script src='/mejs/mediaelement-and-player.min.js'></script>
        <div id='main'>
          {this.props.content}
        </div>
      </div>,
      <Footer key='footer' />
    ];
  }
}
