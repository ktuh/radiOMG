import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Metamorph } from 'react-metamorph';

const faq_data = [
  {
    'title': 'General',
    'pairs': [
      ['What do the call letters KTUH stand for?', 'The “TUH” part stands for '+
        '“<b>T</b>he <b>U</b>niversity of <b>H</b>awaiʻi.” The “K” is a ' +
        'standard used by the FCC across the nation. Essentially, every ' +
        'American radio station west of the Mississippi River has call ' +
        'letters beginning with a “K”, and every radio station east of the ' +
        'Mississippi River has call letters beginning with a “W”. For ' +
        'example, Cincinatti is east of the Mississippi, hence “WKRP.”'],
      ['How do I get a sticker?', 'Send a self-addressed stamped envelope ' +
        'to: Gimme Sticker! c/o KTUH Promotions Director, 2445 Campus Rd., ' +
        'Hemenway Hall #203, Honolulu, HI 96822.'],
      ['Does anyone at KTUH get paid?', 'No, DJs do not get paid at all. ' +
        'Getting to do a cool show every week is payment enough for most of ' +
        'us! Yes, Directors are paid, but it is a mere pittance for the ' +
        'sheer volume of work required. No Director at KTUH, from the ' +
        'General Manager down, makes an amount significant enough to live ' +
        'off of. Most Directors have second or third jobs elsewhere, in ' +
        'addition to being a UHM student.']
    ]
  },
  {
    'title': 'Volunteer',
    'pairs': [
      ['How can I become a DJ at KTUH?', 'In order to become a KTUH DJ, ' +
        'please visit our office on the UHM Campus: Hemenway Hall Room 203, ' +
        'during normal business hours. There you can fill out a Radio ' +
        'Personnel Application.'],
      ['I signed up for DJ training. How long does it take to be called?',
        'There is a long line of people eager to have their own on-air ' +
        'timeslot. The waiting list can be as short as 3 months or as long ' +
        'as a year or more. Call our Program Director at 808.956.5288, e-mail' +
        ' <a href="mailto:#112;&#100;&#64;&#107;&#116;&#117;&#104;&#46;&#111;' +
        '&#114;&#103;"> &#112;&#100;&#64;&#107;&#116;&#117;&#104;&#46;&#111;' +
        '&#114;&#103;</a>, or come by our office to check the status of your' +
        ' application.'],
      ['I am a high school student interested in becoming an intern at KTUH.',
        'We have a ‘summer only’ internship program for those in high school,' +
        ' but our needs and capabilities are constantly changing with every ' +
        'semester. For more information, call our General Manager or our ' +
        'Program Director. You can also e-mail them at ' +
        '<a href="mailto:&#103;&#109;&#64;&#107;&#116;&#117;&#104;&#46;&#111;'+
        '&#114;&#103;">&#103;&#109;&#64;&#107;&#116;&#117;&#104;&#46;&#111;' +
        '&#114;&#103;</a> or <a href="mailto:&#112;&#100;&#64;&#107;&#116;' +
        '&#117;&#104;&#46;&#111;&#114;&#103;">&#112;&#100;&#64;&#107;&#116;'+
        '&#117;&#104;&#46;&#111;&#114;&#103;</a>.']
    ]
  },
  {
    'title': 'Music',
    'pairs': [
      ['I’m a record label representative interested in sending material to ' +
        'KTUH. Who do I contact and/or where do I send my stuff?', 'You can ' +
        'call our Music Director at 808.956.4847 or e-mail ' +
        '<a href="mailto:&#109;&#100;&#64;&#107;&#116;&#117;&#104;&#46;&#111;' +
        '&#114;&#103;">&#109;&#100;&#64;&#107;&#116;&#117;&#104;&#46;&#111;' +
        '&#114;&#103;</a>. Our mailing address is: KTUH FM Honolulu, Hemenway' +
        ' Hall #203, 2445 Campus Road, Honolulu, HI 96822.'
      ],
      ['My band would like to schedule an appearance on KTUH’s Monday Night ' +
        'Live. How do we sign up?', 'First, please be sure that your band is ' +
        'local to the Hawaiʻian islands. Then, call 808.956.5288 and leave a ' +
        'message for the Live Director containing the following information: ' +
        'your name, your band’s name, and your phone number.'
      ],
      [
        'I have sent music to KTUH and would like to know how often it is ' +
        'aired.', 'Again, you would need to contact our Music Director.'
      ],
      [
        'Why are certain types of music played only at certain hours?',
        'This is what we call ‘block programming’. To ensure that a wide ' +
        'variety of music is played on KTUH FM Honolulu, three hour blocks ' +
        'are set aside throughout the day for certain types of music. For ' +
        'example, every day from 9am to 12pm you’ll hear jazz and blues, ' +
        'while from 12pm to 3pm every day you’ll hear rock. For more ' +
        'information, please refer to our <a href="/shows">show schedule</a>.'
      ],
      ['Who decides what music gets played on KTUH?',
        'There is no pre-programmed music on KTUH! This makes us unique: ' +
        'there are only a handful of college stations throughout the nation-' +
        'probably fewer than 10- who do what we do. Aside from the loose ' +
        'genre constraints dictated by our ‘block programming’ schedule, DJs ' +
        'are solely responsible for the musical programming of their three ' +
        'hours per week. The DJs are pretty hip and can each bring their own ' +
        'expertise to KTUH, which helps keep things fresh and cutting-edge. ' +
        'One other restriction imposed on DJs is the obscenity restriction ' +
        'set forth by the FCC. DJs can only play music containing lyrics ' +
        'deemed as profane by the FCC between 10:30pm and 6am.'],
      ['Why aren’t requests always accepted or played immediately?',
        'There are a few possibilities: The request would alter or disrupt ' +
        'the musical flow of the show. An example of this might be a request ' +
        'for a death-metal song during a jazz show. The request could not be ' +
        'found. Keep in mind that in order to find requests, DJs often must ' +
        'browse through the tens of thousands of CDs and records stored in ' +
        'our extensive music library… and don’t forget that this must be done' +
        ' in between songs! The request can be found on a recording which is' +
        ' part of the DJ’s personal collection, but he/she did not bring it ' +
        'to that show that day. This happens a lot in specialty shows or ' +
        'genres where the DJ provides a lot of the music that is played on ' +
        'their show. The request can be found on a recording that is part of' +
        ' the personal collection of a DJ other than the one you called. In ' +
        'this case, call the show during which you heard the request.']
    ]
  },
  {
    'title': 'Events & Promotion',
    'pairs': [
      ['I would like to have information about my event/services promoted on' +
      ' KTUH. Who do I contact?', 'Please mail or fax information about the ' +
      'event/service to our Traffic Director at least two weeks in advance. ' +
      'Our fax number is 808.956.5271. Our mailing address is: KTUH FM ' +
      'Honolulu, Hemenway Hall #203, 2445 Campus Road, Honolulu, HI 96822. ' +
      'Since KTUH is a non-commercial station, events and services can be ' +
      'promoted on KTUH only if they are non-profit or benefit the ' +
      'community (as defined by the FCC). We do not charge for Public ' +
      'Service Announcements and reserve the right to refuse to air any PSA ' +
      'or promo. For more information, you can e-mail the Traffic Director at' +
      ' <a href="mailto:&#116;&#114;&#97;&#102;&#102;&#105;&#99;&#64;&#107;' +
      '&#116;&#117;&#104;&#46;&#111;&#114;&#103;">&#116;&#114;&#97;&#102;' +
      '&#102;&#105;&#99;&#64;&#107;&#116;&#117;&#104;&#46;&#111;&#114;&#103;' +
      '</a>.'],
      ['I am interested in having KTUH co-sponsor an event. Who do I contact?',
        'For co-sponsorship of events or underwriting, please contact our ' +
      'Promotions Director by phone at 808.956.9588 or by e-mail at <a href=' +
      '"mailto:&#112;&#114;&#111;&#109;&#111;&#116;&#105;&#111;&#110;&#115;' +
      '&#64;&#107;&#116;&#117;&#104;&#46;&#111;&#114;&#103;">&#112;&#114;' +
      '&#111;&#109;&#111;&#116;&#105;&#111;&#110;&#115;&#64;&#107;&#116;' +
      '&#117;&#104;&#46;&#111;&#114;&#103;</a>.']
    ]
  }
]

class QAPair extends Component {
  static propTypes = {
    question: PropTypes.string,
    answer: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.expanded !== this.state.expanded;
  }

  handleClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  expanded() {
    if (this.state.expanded) return ' expanded';
    return '';
  }

  render() {
    var expanded = this.expanded.bind(this);

    return (
      <div className='faq__section-qna-pair'>
        <span className='toggle'
          onClick={this.handleClick.bind(this)}>
          {(() => {
            if (this.state.expanded) return '-'; else return '+'; })()}
        </span>
        <div className='faq__section-qna-content'>
          <p onClick={this.handleClick.bind(this)} className='faq__question'>
            <span>{this.props.question}</span>
          </p>
          <p className={'faq__answer' + expanded()} dangerouslySetInnerHTML={
            { __html: this.props.answer }
          } />
        </div>
      </div>
    );
  }
}

class QASection extends Component {
  static propTypes = {
    title: PropTypes.string,
    pairs: PropTypes.array
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='faq__section'>
        <div className='faq__section-header'>
          <h4>{this.props.title}</h4>
        </div>
        <div className='faq__section-qna'>
          {this.props.pairs.map((pair) =>
            <QAPair question={pair[0]} answer={pair[1]} />
          )}
        </div>
      </div>
    )
  }
}

export default class FAQ extends Component {
  render() {
    return [
      <Metamorph title=
        'Frequently Asked Questions - KTUH FM Honolulu | Radio for the People'
      description="KTUH FAQ" image='https://ktuh.org/img/ktuh-logo.jpg' />,
      <h2 className='general__header'>Frequently Asked Questions</h2>,
      <div className='faq__content' key='faq-content'>
        {faq_data.map((node) => (
          <QASection title={node.title} pairs={node.pairs} />
        ))}
      </div>
    ];
  }
}
