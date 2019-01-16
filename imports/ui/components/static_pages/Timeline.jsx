import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Metamorph } from 'react-metamorph';

const timeline_data = [
  ['1968', 'Plans are developed for 10 watt noncommercial educational FM ' +
    'station.'],
  ['July 7, 1969', 'KTUH begins broadcasting on FM for the first time, at ' +
    '90.5 mHz. Broadcasts run from 6:30 p.m. to 2:30 a.m. Sunday through ' +
    'Thursday and from 6:30 p.m. to 3:30 a.m. Fridays. Located in Hawaiʻi ' +
    'Hall, room 206, the station is under the direction of the ' +
    'Speech-Communication Department. General Manager: Fred Barbaria.'],
  ['October 1971', 'KTUH presents the first “quadrophonic sound” radio ' +
    'program in Hawaiʻi. If electronically equipped, listeners will receive ' +
    'four separate signals through four different speakers.'],
  ['1972', 'KTUH broadcasts 24 hours a day, seven days a week.'],
  ['October 1972', 'October: KTUH begins transmitting via Kaiser Teleprompter' +
    ' (cable) to Hawaiʻi Kai (90.9 mHz).'],
  ['July 1973', 'KTUH nearly shut down due to unpaid UPI bill. Payment of ' +
    '$1100 bill out of $1200 budget would bankrupt the station. Dean of ' +
    'Students Si Ellingson pays the bill and saves the day. It is proposed to' +
    ' put station under Department of Student Activities.'],
  ['August 1973', 'KTUH expands, installing translator atop Leahi Hospital in' +
    ' Kaimuki. Frequency is 89.7 mHz for Kaimuki to Hawaiʻi Kai area. General' +
    ' Manager Fred Barbaria resigns. Russell Roberts becomes GM effective ' +
    'September 1.'],
  ['November 1974', 'Main tower erected atop Porteus Hall (currently known as' +
    ' Social Sciences Building); transmitter located below on sixth floor. ' +
    'Transmitter to be operated by remote control from Hawaiʻi Hall. Due to ' +
    'move, main signal will change to 90.3 mHz. Originally planned to go off ' +
    'air for only ten days, station is off air for almost three months due to' +
    ' unforeseen technical problems. General Manager: Ross Stephenson.'],
  ['February 1975', 'KTUH returns to air after equipment improvement.'],
  ['September 1975', 'Translator installed on Mt. Kaala, becoming almost the' +
    ' only station Oʻahu’s North Shore can receive. Frequency is 91.3 mHz.'],
  ['April 1976', 'KTUH shut down after failing to install new emergency ' +
    'broadcasting equipment required by the Federal Communications Commission' +
    ' (FCC). New General Manager is Kerry Painter, after Ross Stephenson ' +
    'resigns to find full-time outside job.'],
  ['July 1976', 'General Manager Kerry Painter resigns to accept full time ' +
    'employment elsewhere. General Manager: Jim Todt.'],
  ['February 1977', 'KTUH returns to air after a two-month absence; ' +
    'broadcasting ceased due to a faulty transmitter.'],
  ['June 1977', 'General Manager: Rick Boudreau.'],
  ['1979', 'KTUH moves into new studios at Hemenway Hall.'],
  ['October 1979', 'The student senate of the Associated Students of the ' +
    'University of Hawaiʻi (ASUH) creates a Broadcast Communication '+
    'Authority (BCA) to oversee KTUH and any future student-run broadcasting' +
    ' ventures. The BCA is funded by a reapportioning of the UH Mānoa ' +
    'student activity fee.'],
  ['1982', 'General Manager: Jan Karasek. Board of Regents approves creation ' +
    'of BCA.'],
  ['1983', 'General Manager: Bob Wiorek.'],
  ['1984', 'KTUH receives permission from the Board of Regents to increase ' +
    'its broadcast power to 100 watts.'],
  ['July 1986', 'KTUH sends three representatives, including General Manager ' +
    'Jai Mansson, to the 16th New Music Seminar in New York. KTUH had never ' +
    'before attended a seminar.'],
  ['December 1987', 'KTUH receives the Trummy Young award. The award is given' +
    ' annually by the Hawaiʻi Jazz Preservation Society for “outstanding ' +
    'achievement in the perpetuation of jazz.” General Manager: Tim Lynch. ' +
    'BCA finally receives funding through student fees, putting the station ' +
    'on solid financial ground at last.'],
  ['August 1988', 'General Manager Stevie Calandra and Program Director ' +
    'Pamela Westcott attend a community radio broadcasters conference in ' +
    'Managua, Nicaragua.'],
  ['1990', 'General Manager: Pamela Westcott.'],
  ['July 4, 1992', 'KTUH cosponsors FACE-IT: Hawaiʻi’s Concert for Life at ' +
    'Andrews Amphitheater to benefit the Life Foundation and PWAC: People ' +
    'With AIDS Coalition.'],
  ['November 1992', 'General Manager: Andrew Hartnett.'],
  ['March 1994', 'General Manager: Jai Mansson.'],
  ['July 7, 1994', 'KTUH’s 25TH ANNIVERSARY! October: General Manager: Pat ' +
    'Louie.'],
  ['October 1994', 'General Manager: Pat Louie.'],
  ['July 1995', 'he KTUH website goes up.'],
  ['June 24, 1996', 'In an attempt to make up for the cuts in the budget by ' +
    'the university, KTUH begins soliciting and airing underwritten spots.'],
  ['December 1996', 'The KTUH website moves to its own server housed in the ' +
    'KTUH General Office.'],
  ['April 1997', 'Frank McPherson becomes GM.'],
  ['July 1997', 'KTUH gets a new airboard.'],
  ['November 13, 1998', 'In a Board of Regents meeting on Maui, a power ' +
    'increase to 3,000 watts is approved for KTUH FM Honolulu.'],
  ['March 1999', 'Frank McPherson steps down. Cedric Duarte assumes General ' +
    'Manager’s duties as Interim GM.'],
  ['July 7, 1998', 'KTUH’s 30TH ANNIVERSARY!'],
  ['May 2000', 'Barry Sato replaces Cedric Duarte as General Manager. ' +
    'Program Director duties, vacated by Sato, are assumed by Mary Brunson.'],
  ['December 2000', 'Stacy Kinoshita replaces Mary Brunson as Program Director.'
  ],
  ['May 2001', 'Barry Sato steps down. Lori Ann Saeki assumes General ' +
    'Manager’s duties as Interim GM.'],
  ['July 2001', 'Stacy Kinoshita steps down. Allyson Ota assumes Program ' +
    'Director’s duties as Interim PD.'],
  ['July 31, 2001', 'At midnight on Tuesday morning, KTUH says goodbye to ' +
    'transmitting at 100 watts. Transmission will be discontinued for an ' +
    'estimated two weeks while KTUH’s tower and antenna are renovated for ' +
    'broadcast at 3,000 watts.'],
  ['August 9, 2001', 'Due to unforeseen technical issues, KTUH’s estimated ' +
    'return to the airwaves at 3,000 watts is moved from Monday, August 13 at' +
    ' 6:00 a.m. to Thursday, August 16 at 6:00 a.m.'],
  ['August 16, 2001, 6:00 AM', 'KTUH returns to the airwaves at 3,000 watts! ' +
    'The first song broadcast is “Change is Gonna Come,” by Otis Redding. The' +
    ' first DJ is Jeffery Long, filling an open show. Present are General ' +
    'Manager Lori Ann Saeki, Program Director Shaun Lau, Production Director ' +
    'John Goya, and Traffic Director Mark Ulit.'],
  ['August 16, 2001, 6:03 AM', 'KTUH Online is relaunched to coincide with ' +
    'KTUH’s return to the airwaves. It is the site’s second makeover since ' +
    'its inception in July 1995. The site is also made accessible through the'+
    ' URL ktuh.org.'],
  ['October 3-9, 2004', 'Radiothon 2004. KTUH raises approximately $33,000 ' +
    'towards its new Windward frequency and general station improvements.'],
  ['November 17, 2005', 'KTUH debuts on the Windward side at 89.9 FM.'],
  ['March 16, 2016, 3:00 PM', 'KTUH switches its frequency to 90.1 FM, ' +
    'broadcasting island-wide at 7000 watts. DJ Mermaid plays Ea Mai Hawaiʻi' +
    ' by Kaumakaʻiwa Kanakaʻole to celebrate the change.']
]
;

class TimelineNode extends Component {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='timeline__node'>
        <div className='timeline__node-title'>
          {this.props.title}
        </div>
        <div className='timeline__node-body'>
          {this.props.body}
        </div>
      </div>
    );
  }
}

export default class Timeline extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return [
      <Metamorph title="Timeline - KTUH FM Honolulu | Radio for the People"
        description="KTUH Timeline" image='https://ktuh.org/img/ktuh-logo.jpg'
      />,
      <h2 className='general__header'>KTUH Timeline</h2>,
      <div className='timeline' key='timeline'>
        <div className='timeline__content'>
          {timeline_data.map(function(node) {
            return <TimelineNode title={node[0]} body={node[1]} />
          })}
        </div>
      </div>
    ];
  }
}
