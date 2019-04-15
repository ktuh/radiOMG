import React, { Component } from 'react';

export default class SSRHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className='navbar navbar-default' role='navigation'>
        <div className='info-box'>
          <a className='info-box__link' href='https://ktuh.org/'>
            <img alt='KTUH FM' src='https://ktuh.org/img/ktuh-fm-logo.png' />
          </a>
        </div>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed'
            data-toggle='collapse' data-target='#navigation'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
        </div>
        <div className='collapse navbar-collapse' id='navigation'>
          <ul className='nav navbar-nav navbar-left'>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'
                role='button' aria-haspopup='true' aria-expanded='false'>
                  About Us <span className='caret'></span>
              </a>
              <ul className='dropdown-menu'>
                <li className='header__submenu-support'>
                  <a href={'https://www.uhfoundation.org/give/giving-gift.aspx'+
                    '?school_code=ktuh'}>
                    <button className='btn btn-md'>Donate Now</button>
                  </a>
                </li>
                <li><a href='/about-us'>KTUH History</a></li>
                <li><a href='/timeline'>KTUH Timeline</a></li>
                <li><a href='/staff'>KTUH Staff</a></li>
                <li><a href='/alumni'>KTUH Alumni</a></li>
                <li><a href=
                  {'https://www.uhfoundation.org/give/giving-gift.aspx' +
                    '?school_code=ktuh'}>Donate</a>
                </li>
                <li><a href='/join-ktuh'>Join KTUH</a></li>
                <li><a href='/contact-us'>Contact Us</a></li>
                <li><a href='/faq'>FAQ</a></li>
                <li><a href='/underwriting'>Underwriting</a></li>
              </ul>
            </li>
            <li className='dropdown'>
              <a className='dropdown-toggle' data-toggle='dropdown'
                role='button' aria-haspopup='true' aria-expanded='false'>
                Music <span className='caret'></span>
              </a>
              <ul className='dropdown-menu'>
                <li><a href='/shows'>Show Schedule</a></li>
                <li><a href='/playlists'>Playlists</a></li>
                <li><a href='/reviews'>Reviews</a></li>
                <li><a href='/charts'>Charts</a></li>
              </ul>
            </li>
            <li className='nav-item nav-item__parties'>
              <a href='/events'>Events</a>
            </li>
            <li className='nav-item nav-item__news'>
              <a href='/radioblog'>Radioblog</a><
            /li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li className='nav-item'>
              <a className='header__support-link'
                href={'https://www.uhfoundation.org/give/giving-gift.aspx' +
                  '?school_code=ktuh'}>
                <button type='button'
                  className='btn btn-md header__support-btn'>
                  <span>DONATE</span>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
