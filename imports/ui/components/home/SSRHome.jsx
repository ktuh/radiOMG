import React, { Component } from 'react';
import Support from '../includes/Support.jsx';
import { Metamorph } from 'react-metamorph';

export default class Home extends Component {
  render() {
    return [
      <Metamorph title='KTUH FM Honolulu | Radio for the People'
        image="https://ktuh.org/img/ktuh-logo.jpg"
        description="KTUH Homepage" />,
      <Support key='support' />
    ];
  }
}
