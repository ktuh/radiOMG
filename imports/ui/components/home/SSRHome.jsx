import React, { Component } from 'react';
import Support from '../includes/Support.jsx';
import { Helmet } from 'react-helmet';

export default class Home extends Component {
  render() {
    return [
      <Helmet key="metadata">
        <title>KTUH FM Honolulu | Radio for the People</title>
        <meta property="og:title"
          content="KTUH FM Honolulu | Radio for the People" />
        <meta property="og:description" content="KTUH Homepage" />
        <meta name="twitter:title" content=
          'KTUH FM Honolulu | Radio for the People' />
        <meta name="twitter:url" content="https://ktuh.org" />
        <meta name="twitter:description" content="KTUH Homepage" />
        <meta name="twitter:site" content="@ktuh_fm" />
        <meta name="twitter:image" content={
          'https://ktuh.org/img/ktuh-logo.jpg'
        } />
        <meta name="twitter:creator" content="@ktuh_fm" />
        <meta property="description" content="KTUH Homepage" />
      </Helmet>,
      <Support key='support' />
    ];
  }
}
