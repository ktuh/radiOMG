import React, { Component } from 'react';
import SSRHeader from '../includes/SSRHeader.jsx';
import Footer from '../includes/Footer.jsx';
import { Meteor } from 'meteor/meteor';
import { Helmet } from 'react-helmet';

export default class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return [
      <Helmet htmlAttributes={{ 'lang': 'en', 'amp': undefined }}
        titleTemplate='%s' meta={[
          {
            'name': 'viewport',
            'content': 'initial-scale=1, user-scalable=0, width=device-width'
          },
          {
            'name': 'keywords',
            'content': 'hardstyle, DJ, Honolulu, Hawaii'
          },
          {
            'name': 'msapplication-TileColor',
            'content': '#da532c'
          },
          {
            'name': 'msapplication-TileImage',
            'content': '/mstile-144x144.png' },
          {
            'name': 'msapplication-config',
            'content': '/browserconfig.xml'
          },
          {
            'name': 'theme-color', 'content': '#ffffff'
          },
          { 'name': 'viewport',
            'content':'width=device-width, initial-scale=1' }
        ]} link={[{
          'rel': 'stylesheet',
          'type': 'text/css',
          'href': '/main.css'
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
