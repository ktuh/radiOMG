import React, { Component } from 'react';

export default class Support extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className='support'>
        <h1 className='support__heading'>College Radio Needs Your Support!</h1>
        <p className='support__about'>
          KTUH is a non-commercial radio station broadcasting
          from the UHM. In
          addition to funding from UHM student fees, KTUH
          also looks to donations from the community.
        </p>
        <a href=
          'https://www.uhfoundation.org/give/giving-gift.aspx?school_code=ktuh'
        className='color-button purple-button'>Donate Now</a>
      </div>
    );
  }
}
