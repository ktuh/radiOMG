import React, { Component } from 'react';
import { getLocalTime } from '../../../startup/lib/helpers.js';

export default class Footer extends Component {
  constructor() {
    super();
    this.officeEmail = this.officeEmail.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  officeEmail() {
    return '<a href=\'&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#' +
      '111;&#102;&#102;&#105;&#99;&#101;&#64;&#107;&#116;&#117;&#104;&#46;' +
      '&#111;&#114;&#103;\'>' + [6,0,0,5,3,9,22,24,4,1,23].map(
      (i) => 'function(e) { return "@hk" + e; })'.split('')[i]).join('') +
      '.org</a>';
  }

  render() {
    return (
      <div className='footer'>
        <div className='footer__mission-wrapper'>
          <div className='footer__logo-wrapper'>
            <img src='/img/ktuh-logo-white-alpha.png' />
          </div>
          <div className='footer__mission'>
            <h5 className='footer__subheading'>Our Mission</h5>
            <p className='mission__body'>
              To provide the people of Honolulu with alternative
              programming for the cultural and educational enrichment of the
              students of the university system and the community.
            </p>
          </div>
        </div>
        <div className='footer__contact'>
          <div className='footer__address'>
            <h5 className='footer__subheading'>Address</h5>
            <p>
              2445 Campus Road<br/>
              Hemenway Hall #203<br/>
              Honolulu, HI 96822
            </p>
          </div>
          <div className='footer__phone'>
            <h5 className='footer__subheading'>Contact</h5>
            <p>
              <a href='tel:18089565288'>Office + 808.956.5288</a>
            </p>
            <br />
            <p><a href='tel:18089567261'>Request + 808.956.7261</a></p><br />
            <br />
            <p dangerouslySetInnerHTML={{ __html: this.officeEmail() }} />
          </div>
          <div className='footer__links footer__links__clear'>
            <h5 className='footer__subheading'>UHM Student Media</h5>
            <p><a href='http://hawaiireview.org/'>Hawaii Review</a></p>
            <p><a href='http://kaleo.org/'>Ka Leo </a></p>
            <p><a href='http://www.manoanow.org/'>Manoa Now</a></p>
            <p><a href='http://www.manoanow.org/uhpro/'>UH Productions</a></p>
          </div>
        </div>
        <div className='footer__social'>
          <a href='http://instagram.com/ktuhfm' target="_blank" rel=
            "noopener noreferrer">
            <img src='/img/instagram-white.png' />
          </a>
          <a href='https://www.facebook.com/ktuhfm' target="_blank" rel=
            "noopener noreferrer">
            <img src='/img/facebook-white.png' />
          </a>
          <a href='http://twitter.com/ktuhfm' target="_blank" rel=
            "noopener noreferrer">
            <img src='/img/twitter-white.png' />
          </a>
        </div>
        <p className='footer__copyright'>
          {`COPYRIGHT © ${getLocalTime().year()} KTUH FM Honolulu`}</p></div>);
  }
}
