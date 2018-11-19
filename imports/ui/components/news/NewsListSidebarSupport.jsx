import React, { Component } from 'react';

export default class NewsListSidebarSupport extends Component {
  render() {
    return (
      <div className='news-list__support'>
        <p className="playlist__sidebar-header">SUPPORT COLLEGE RADIO</p>
        <p>
          KTUH is a non-commercial radio station,
          broadcasting out of the University of
          Hawai‘i at Mānoa. In addition to funding
          from UHM student fees, KTUH also
          looks to donations from the community.
        </p>
        <div className='button__wrapper'>
          <a className='color-button purple-button'
            href=
              {'https://www.uhfoundation.org/give/giving-gift.aspx' +
              '?school_code=ktuh'}>
              Donate Today</a>
        </div>
      </div>
    );
  }
}
