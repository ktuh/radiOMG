import React, { Component } from 'react';
import { Metamorph } from 'react-metamorph';

export default class About extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return ([
      <Metamorph title="About Us - KTUH FM Honolulu | Radio for the People"
        description="About KTUH" image='https://ktuh.org/img/ktuh-logo.jpg' />,
      <h2 className='general__header'>About KTUH</h2>,
      <div className='about__desc'>
        <p>
          <span className='copy__caps'>KTUH</span>
          is a student-run noncommercial radio station broadcasting from the
          University of Hawaiʻi at Mānoa. We’ve been serving the community since
          1969 with a variety of programs that include public announcements,
          equipment for community events, and a practical chance to learn about
          radio broadcasting. KTUH was granted a license to the Board of Regents
          as a non-commercial educational FM Station by the Federal
          Communications Commission (FCC) on June 28, 1985. Maintaining a staff
          in excess of 70 volunteers annually, KTUH operates 24 hours a day,
          year-round.
        </p>
        <p>
          <span className='copy__caps'>Our purpose</span> is to provide the
          people of Honolulu with alternative programming for the cultural and
          educational enrichment of the students of the university and the
          community.
        </p>
      </div>,
      <div className='about__content'>
        <p>
          KTUH began as a standing committee of the Associated Students of the
          University of Hawaiʻi (ASUH) in 1966. For the first three years, KTUH
          was entirely an ASUH committee, both in funding and operation. As an
          AM closed circuit operation, it reached UH dorms and the Hemenway Hall
          lounge. On September 28,
          1967, the ASUH passed a resolution asking then-UH President Thomas
          Hamilton to apply for an FM educational license.
        </p>
        <p>
          In December 1968, under the sponsorship of ASUH Senator Ken Kuniyuki,
          the ASUH passed another resolution again petitioning the BOR to apply
          for an FM educational license. Under the direction of Dr. Forest L.
          Whan, Faculty Advisor to KTUH, and with the approval of
          Speech-Communications Department Chairman Dr. Richard Rider and Dean
          Furniss, Dean of Arts and Sciences, President Hamilton was urged to
          approve an application to be filed with the FCC for an FM educational
          radio station. On January 8, 1969, the BOR authorized the
          administration to file for a 10 watt FM radio station.
        </p>
        <p>
          KTUH was issued its first educational FM license on September 29,
          1969. With the expansion of KTUH to an FM station, the Department of
          Speech-Communications obtained administrative control and line
          funding, though the ASUH continued to publish the station’s program
          guide as a quasi-stipulation of the BOR at the time of transfer.
        </p>
        <p>
          According to the original purposes, objectives and program policies
          laid down in the 1968 license application to the FCC, KTUH’s prime
          responsibilities were to provide the people of Honolulu with
          alternative programming for the cultural and educational enrichment of
          the students of the University and the community. As KTUH has grown,
          it has metamorphosized from a radio lab in the Speech-Communications
          Department to a public radio facility, in continuous operation,
          producing quality educational programming for student and community
          growth. It is the primary objective of KTUH to produce and disseminate
          to the students and the community the vast wealth of opportunities
          within the University.
        </p>
        <p>
          The construction of the present studios in Hemenway Hall was made
          possible by a grant from the 1974 Legislature and part of the
          installation of the facilities was aided by a grant from the Campus
          Center Board in January 1979. The present studios double the previous
          area available, and triple previous available studio space, making
          possible live music, more complete news coverage, and other special
          events.
        </p>
        <p>
          In 1977, KTUH fell under the aegis of the Director of the Bureau of
          Student Activities, and it developed as a student organization similar
          in design and intent to those previously chartered by the BOR. In 1979
          a proposal was made to the Chancellor recommending that KTUH become
          part of a new chartered organization. The organization, called the
          Broadcast Communication Authority (BCA), was granted its charter on
          April 6, 1982. On June 28, 1985, KTUH FM went to 100 watts ERP, in
          compliance with FCC regulations.
        </p>
        <p>
          At midnight on the morning of Tuesday, July 31, 2001 KTUH said goodbye
          to transmitting at 100 watts. At 6:00 a.m. on the morning of Thursday,
          August 16, KTUH returned to the airwaves at 3,000 watts! The first
          song to broadcast was 'Change is Gonna Come' by Otis Redding.
        </p>
        <p>
          It currently broadcasts on 90.1 MHz with an effective radiated power
          of 7.0 kW (as of March 19, 2016) from Mount Tantalus.
        </p>
        <div className="aspect-ratio">
          <iframe className="about__youtube"
            src="https://www.youtube.com/embed/HvslPiSeeKk" frameBorder="0"
            allow={'accelerometer; autoplay; encrypted-media; ' +
              'gyroscope; picture-in-picture'} allowFullScreen />
        </div>
      </div>,
      <div className='about__help'>
        <div><h3 className='about__help__lighter'>I want to:</h3></div>
        <div>
          <h3>
            <a href=
              {'https://www.uhfoundation.org/give/giving-gift.aspx' +
                '?school_code=ktuh'}>Support KTUH</a></h3>
          <h3><a href='/join-ktuh'>Become a volunteer</a></h3>
          <h3><a href='/contact-us'>Get in touch</a></h3>
        </div>
      </div>]
    );
  }
}
