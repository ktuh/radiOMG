import React, { Component } from 'react';
import { Metamorph } from 'react-metamorph';
import AlumniListForm from './AlumniListForm';

export default class Alumni extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return [
      <Metamorph title="Alumni - KTUH FM Honolulu | Radio for the People"
        description="KTUH Alumni" image='https://ktuh.org/img/ktuh-logo.jpg' />,
      <h2 className='general__header'>KTUH Alumni</h2>,
      <div className='alumni__content'>
        <div className="alumni__img">
          <img src='/img/Group45.jpg'
            alt={'Question: Why are these people smiling? ' +
              'Answer: they all attended the “KTUH 45” ' +
              'Alumni gathering in 2014!'} />
        </div>
        <p dangerouslySetInnerHTML={{ __html:
          '<b>KTUH-FM will be 50 years old this year</b> ' +
          'We will celebrate this fall with a big event on the first weekend ' +
          'in October. All KTUH alumni are invited to attend. This web page ' +
          'will be updated with general event information, but full details ' +
          'will be emailed to alumni as they become available, so you’ll ' +
          'want to be sure that your current email address is on the KTUH ' +
          'alumni email list (you should have received an alumni email ' +
          'message last month if you are on the list). If you need to update ' +
          'your address or to be added to the alumni list, please complete ' +
          'the form below or email <a ' +
          'href=\'mailto:&#97;&#108;&#117;&#109;&#110;&#105;&#64;&#107;&#116;' +
          '&#117;&#104;&#46;&#111;&#114;&#103;\'>&#97;&#108;&#117;&#109;&#110;'+
          '&#105;&#64;&#107;&#116;&#117;&#104;&#46;&#111;&#114;&#103;</a>.' }}
        />
        <AlumniListForm />
        <p dangerouslySetInnerHTML={{ __html:
          '<b>Got News?</b> Alumni news, that is... If you would like to ' +
          'share any KTUH alumni news items, please email them to <a href=\'ma'+
          'ilto:&#97;&#108;&#117;&#109;&#110;&#105;&#64;&#107;&#116;&#117;&#10'+
          '4;&#46;&#111;&#114;&#103;\'>&#97;&#108;&#117;&#109;&#110;&#105;&#64'+
          ';&#107;&#116;&#117;&#104;&#46;&#111;&#114;&#103;</a>.' }} />

        <p><b>Would you like to see reunion and archive photos?</b></p>

        <p>
          We have photos of the two recent alumni reunions, details below, plus
          photos of and from the 2010 "KTUH 40" gallery show and more on the
          KTUH Alumni <a href="https://www.flickr.com/photos/ktuh40">
            flickr page
          </a>.
        </p>
        <div className="alumni__img">
          <img src="/img/Air Studio 1973.jpg"
            alt="KTUH Hawai'i Hall air studio, early 70's" />
        </div>
        <p><b>50 Years Ago at KTUH...</b></p>

        <p>
          KTUH has been on Honolulu's FM airwaves since 1969, but do you know
          that KTUH operated as an AM "carrier current" low power operation from
          1966 until 1969? The original staff got the old Hawai'i Hall audio
          gear running, built several low power AM transmitters that attached to
          the electrical panels (the dorm building wiring served as the
          antennas) and operated a limited on air schedule to show that they
          could successfully staff and operate a radio station. A humble
          beginning for the 7,000 watt, 24/7 operation of today's KTUH FM.
        </p>

        <p><b>Where are They Now? We Found David Dugle!</b></p>

        <p>
          While looking online for information on some KTUH alumni I found David
            Dugle and his treasure trove of air checks from the 1970s.
        </p>
        <div className="alumni__img">
          <img src="/img/DDugle1976.jpg" alt="David Dugle, 1976" />
        </div>
        <p>
          David writes, "I have become a business analyst for software teams.
          I still live in California, but my current project is all the way
          across the country in Washington, DC. So how many other KTUH folks
          from our thumpin' days have you found?  Would love to re-connect with
          Brian Daniel and Bill Soares especially, but also Chip Brown and the
          Langdon Brothers if you know where they are. I actually have been
          working on an autobiography and have written quite a lot about my days
          at Hawaii Hall. That dang station changed my life!"
        </p>
        <div className="alumni__img">
          <img src="/img/DDugle.jpg" alt="David Dugle" />
        </div>
        <p>
          From David's podomatic site: "David Dugle (AKA Rusty Pipes in my years
          writing for the Cosmik Debris webzine) is a full time secular
          humanist, agnostic skeptic, writer, photographer, bicyclist, dad and
          former professional broadcaster. David really does read philosophy
          books, including the Bible, and likes to argue scripture with
          Jehovah's Witneses when they come to his door. He does not believe in
          witches, the Devil or creation science. He does believe in God, but
          says that what he calls God may be quite a lot different than what
          other people call God.
        </p>

        <p>
          "David was born in Cincinnati, Ohio, but lived many years in Honolulu
          where he started his broadcasting career. He worked for several radio
          stations and was most famous for his rock-comedy show Insanity Palace
          which aired on KPOI-FM and KTUH-FM during the 70's. David still
          deejays by creating podcasts for the Internet and by day he still DJs
          also, except that it stands for database jockey, not disc jockey."
        </p>
        <p>
          You can hear the first part of Davidís 1976 Frank Zappa interview on
          KTUH
          <a href=
            "http://dugledavid.podomatic.com/entry/2015-02-28T22_18_05-08_00">
            here.
          </a>
          There are many more air checks, including an interview with Flo and
          Eddie of the Turtles <a href="http://www.podomatic.com/dugledavid">
            here.
          </a>
        </p>

        <p><b>Where Are They Now? Dave and Kenny Wild</b></p>
        <p>
          Dave Wild hosted the Tuesday evening jazz show on KTUH-FM in the early
          70s. His brother, Kenny, took over the Tuesday hosting duties when
          Dave moved on. Dave and Kenny were more than knowledgeable djs,
          however, both were (and are) accomplished jazz musicians ñ Dave on
          piano and Kenny on both standup and electric bass. The Dave Wild Trio
          played gigs at UH and other venues.
        </p>

        <p>Dave writes...</p>

        <p>
          "I think I started with KTUH in 1969; the old schedules would confirm
          that. I vaguely remember getting a 3rd class broadcasters license,
          somehow, in '68 or '69. The show was the Wild World of Jazz, I think
          on Tuesday nights?  Ken came in with his own edition of the show
          (probably in 1970), on Thursday night I think. I think my career ended
          when I started working with Linda Ryan at the old Cavalier Restaurant,
          probably in the summer of 1970.  Ken and I both had the same problem:
          gigs on the nights we had to broadcast. I left for the Army in August
          1970 but I think Ken kept on broadcasting for a while. He went out on
          the road with Seawind in the summer of 1972, just before I came back
          in August. I know I wanted to start up the jazz show again but my
          fulltime gig with Jimmy Borges (fall of 1972) interfered with that.
          Somewhere in that period Ken also did several Live From KTUH shows
          with elements of Seawind, probably even before it existed (as Ox)."
        </p>
        <div className="alumni__img">
          <img src="/img/WildBros0811.jpg"
            alt={'KTUH alumni Dave Wild (left, on piano) and Ken Wild (right, '+
              'on upright bass) playing at Vitelloís in Studio City, CA ' +
              '(2011). Eric Marienthal (sax) is in the center.'} />
        </div>
        <p>
          Dave ended up in central Texas, where he plays piano, writes and has a
          web site (about jazz) at
          <a href="http://www.wildmusic-jazz.com/">
            http://www.wildmusic-jazz.com/
          </a>. Dave picked up a Masters Degree in Jazz Studies &amp;
          Arranging/Composing along the way. There is a lot more to Dave than
          this, but you'll need to ask him to tell you more.
        </p>

        <p>
          Kenny Wild was a founding member of Seawind (1972) and left UH before
          graduating to go on the road with the band. Ken and Seawind were on
          the road for several years (including a famous stay at the Fancy Moose
          Inn in Anchorage Alaska) before winding up in LA in 1975. Seawind
          recorded four albums during that period. Seawind played on KTUH's
          Pakalolo Patch (now Monday Night Live) as Limp Jelly Beans before the
          band left on tour. Kenny has been a studio musician in Los Angeles for
          quite a while, and has backed many singers, from Natalie Cole
          (touring band) to Gloria Estefan to Neil Young.
        </p>

        <p>
          Dave says, "I donít know if and when we'll be back to play in southern
          Cal. There may be something next summer, but I'm not yet sure. We'd
          also both love to go back to Honolulu again but that's a much more
          elusive goal."
        </p>

        <p><b>26 Signs You Were a College DJ</b></p>

        <p>
          KTUH's General Manager at the time, Jay-me Morita, sent this URL
          around in an email and it really applies to KTUH's alumni: <a href={
            'http://www.buzzfeed.com/mariasherm/' +
            '26-signs-you-were-a-college-radio-dj'}>
            {'http://www.buzzfeed.com/mariasherm/' +
              '26-signs-you-were-a-college-radio-dj'}
          </a>.
          Thanks, Jay-me.
        </p>
        <div className="alumni__img">
          <img src="/img/JTMorse.jpg"
            alt="JT Morse spinning the tunes, circa 1970." />
        </div>

        <p><b>KTUH Alumni Reunions</b></p>

        <p>
          KTUH alumni have held two reunions so far. The first, in summer, 2011,
          was held on campus on the makai Hemenway patio, with about 75 alumni
          and guests attending. We celebrated 45 years of KTUH being on the air
          (starting with the carrier-current operation in 1966).
        </p>

        <p>
          The second reunion, celebrating 45 years of FM operation, was held in
          June, 2014. A wide spectrum of ages and years at KTUH was evident.
        </p>

        <div className="alumni__img">
          <img src="/img/Reunion2014.jpg" />
        </div>

        <p>
          What's next? Hopefully a big 50th celebration for the KTUH alumni,
          staff and listeners in 2019. Stay tuned!
        </p>

        <p><b>We Remember the KTUH Staff That Are No longer With Us...</b></p>
        <div className="alumni__img">
          <img src='/img/Memorial Poster 0716.jpg' />
        </div>
      </div>
    ];
  }
}
