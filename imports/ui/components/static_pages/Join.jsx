import React, { Component } from 'react';
import { Metamorph } from 'react-metamorph';

export default class Join extends Component {
  shouldComponentUpdate() {
    return false;
  }

  email() {return <a href=
    'mailto:&#112;&#100;&#64;&#107;&#116;&#117;&#104;&#46;&#111;&#114;&#103;'>
    &#112;&#100;&#64;&#107;&#116;&#117;&#104;&#46;&#111;&#114;&#103;</a>;
  }

  render() {
    return [
      <Metamorph title='Join KTUH - KTUH FM Honolulu | Radio for the People'
        description="Join KTUH" image='https://ktuh.org/img/ktuh-logo.jpg' />,
      <h2 className='general__header'>Join KTUH</h2>,
      <div className='join__desc' key="join-desc">
        <p>
          <span className='copy__caps'>Want to</span> be a DJ? Are you a UHM
          student who wants to learn more about broadcast radio, or who just
          loves music? If so, KTUH wants you!
        </p>
        <p>
          <span className='copy__caps'>KTUH </span> is staffed almost entirely
          by UHM students, so this is your chance to be on the air and learn a
          thing or two about the behind-the-scenes magic that goes into running
          a 24-hour, 7-day-a-week radio station.
        </p>
      </div>,
      <div className='join__content' key="join-content">
        <p>
          If you’d like to become a KTUH DJ, swing by our office in Hemenway 203
          (above Ba-Le) during regular business hours and fill out an
          application or download the application <a target="_blank"
            href="/files/ktuh_personnel_application_form.pdf">
            here
          </a>.
        </p>
        <p>
          Due to the number of students interested in being on the air, it may
          take three months to a year before an applicant is called in for
          training, depending on the length of the waiting list and the amount
          of station turnover.
        </p>
        <p>
          For more information, please contact our programming department at
          (808) 956-5288 or {this.email()}.
        </p>
        <p>
          If you are not a UHM student, please contact the programming
          department to ask about our limited number of community timeslots.
        </p>
        <p>
          Just want to help out? If you’re not interested in being on air but
          still want to help out at the station, contact the programming
          department at (808) 956-5288 or {this.email()} for information on ways
          you can get involved off air.
        </p>
      </div>
    ];
  }
}
