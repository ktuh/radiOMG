import React, { Component } from 'react';
import Landing from '../home/Landing.jsx';
import Header from '../includes/Header.jsx';
import Footer from '../includes/Footer.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

export default class Layout extends Component {
  constructor(props) {
    super(props);
  }

  home() {
    return FlowRouter.getRouteName() === 'home';
  }

  render() {
    return [
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
