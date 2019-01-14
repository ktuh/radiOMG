import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class Contact extends Component {
  render() {
    return [
      <Helmet key="metadata">
        <title>Contact Us - KTUH FM Honolulu | Radio for the People</title>
        <meta property="og:title"
          content="Contact Us - KTUH FM Honolulu | Radio for the People" />
        <meta property="og:description" content="Contact KTUH" />
        <meta name="twitter:title" content=
          'Contact Us - KTUH FM Honolulu | Radio for the People' />
        <meta name="twitter:url" content="https://ktuh.org" />
        <meta name="twitter:description" content="Contact KTUH" />
        <meta name="twitter:site" content="@ktuh_fm" />
        <meta name="twitter:image" content={
          'https://ktuh.org/img/ktuh-logo.jpg'
        } />
        <meta name="twitter:creator" content="@ktuh_fm" />
        <meta property="description" content="Contact KTUH" />
      </Helmet>,
      <h2 className='general__header'>Contact Us</h2>,
      <div className='contact__content' key='contact-content'>
        <p>
        Got a question or comment? Drop us a line and let us know what you
        think of our programming!
        You can reach the on-air DJ at (808) 956-7261.
        </p>

        <p>
        Have an event to include in our on-air calendars? Fill out our
          <a href='https://docs.google.com/forms/d/e/1FAIpQLSefFe5zO_bJsjuS2vKkKslU2aKEVdf8M6Vo9cplNLXV7rO2iA/viewform'>
            <b>KTUH Production Request Form!</b>
          </a>
        For questions, email Productions.
        </p>

        <p>For general inquiries and concerns, contact the KTUH office at
          (808) 956-5288.</p>

        <p>For underwriting or sponsorship requests, please email
          Underwriting.</p>

        <p>Music inquiries can be sent to the Music Director.</p>

        <p>Other concerns may be directed to the General Manager at
          956-7431.</p>

        <p>
        Questions, ideas, or submissions for the website? Problems with the
        stream server or other tech issues? Please contact Web.
        </p>

        <h4>Mailing Address</h4>
        <p>
        Our mailing address is KTUH, 2445 Campus Rd. Hemenway Hall #203,
        Honolulu, HI 96822.
        </p>
      </div>
    ];
  }
}
