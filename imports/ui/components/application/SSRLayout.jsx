import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SSRHeader from '../includes/SSRHeader.jsx';
import Footer from '../includes/Footer.jsx';
import { Helmet } from 'react-helmet';

export default class Layout extends Component {
  static propTypes = {
    content: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    return [<Helmet htmlAttributes={{ 'lang': 'en', 'amp': undefined }}
      titleTemplate='%s' meta={[{ 'name': 'viewport', 'content':
        'initial-scale=1, user-scalable=0, width=device-width' }, { 'name':
        'keywords', 'content':
        '90.1 FM,KTUH,college radio,Honolulu,Hawaii,radio,University of Hawaii'
      },
      { 'name': 'msapplication-TileColor', 'content': '#da532c' },
      { 'name': 'msapplication-TileImage', 'content': '/mstile-144x144.png' },
      { 'name': 'msapplication-config', 'content': '/browserconfig.xml' },
      { 'name': 'theme-color', 'content': '#ffffff' },
      { 'name': 'twitter:url', 'content': 'https://ktuh.org' },
      { 'name': 'twitter:url', 'content': '@ktuh_fm' },
      { 'name': 'twitter:creator', 'content': '@ktuh_fm' }]} link={[{
        'rel': 'stylesheet', 'type': 'text/css',
        'href': 'https://ktuh.org/main.css'
      }]} />,
    <div className='container' key='container'>
      <div className='spacer-sm' key='sm' />
      <SSRHeader key='header' />
      <div id='main'>
        {this.props.content}
      </div>
    </div>,
    <Footer key='footer' />
    ];
  }
}
