import React, { Component } from 'react';
import { Metamorph } from 'react-metamorph';

export default class Underwriting extends Component {
  shouldComponentUpdate() {
    return false;
  }

  email() {
    return '<a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#117;&#110;' +
      '&#100;&#101;&#114;&#119;&#114;&#105;&#116;&#105;&#110;&#103;&#064;' +
      '&#107;&#116;&#117;&#104;&#046;&#111;&#114;&#103;">' +
      '&#117;&#110;&#100;&#101;&#114;&#119;&#114;&#105;&#116;&#105;&#110;' +
      '&#103;&#064;&#107;&#116;&#117;&#104;&#046;&#111;&#114;&#103;</a>';
  }

  render() {
    return [
      <Metamorph title="Underwriting - KTUH FM Honolulu | Radio for the People"
        description="KTUH Underwriting Info"
        image='https://ktuh.org/img/ktuh-logo.jpg' />,
      <h2 className='general__header'>Underwriting</h2>,
      <div className='contact__content'>
        <h4>What is Underwriting?</h4>
        <p>
          Underwriting is a perfect way to support college radio! As a non-
          commercial radio station, the Federal Communications Commission (FCC)
          prohibits KTUH from airing advertisements. However, the FCC does allow
          KTUH to broadcast 20-30 second spots that acknowledge sponsors who
          donate funds to the station.
        </p>
        <p dangerouslySetInnerHTML={{ __html: 'KTUH underwriting is a way for' +
          ' your business, corporation, foundation or organization to expand ' +
          'your network, awareness, and customer base. Radio is one of the ' +
          'most accessible ways to reach a diverse audience connecting the ' +
          'community to local businesses. Contact ' + this.email() +
          ' for more information.' }} />
        <p>
          Through KTUH Underwriting, your business or organization will be
          recognized as a supporter of a college radio station, which enhances
          your image as one that cares about the education and quality of
          community life. Some of our previous underwriters include:
        </p>
        <ul className="underwriting__list">
          <li>Surf &amp; Sea</li>
          <li>{'Arts at Mark\'s Garage'}</li>
          <li>Incubator</li>
          <li>eBikes</li>
          <li>Bar 35</li>
          <li>Honolulu Beer Works</li>
          <li>Cake Works</li>
          <li>Grondin</li>
        </ul>
        <p>
          We have weekly, monthly, and yearly packages that can help you get
          your business name out there:
        </p>

        <h4>Package A (60 Spots)</h4>
        <p>
          Air times are between 6 AM and 9 PM and includes weekends. Can include
          2 or more spots per day/per month, given the number of days in the
          month.
        </p>

        <h4>Package B (30 Spots)</h4>
        <p>
          Air times are between 6 AM to 9 PM and includes weekends. Up to 2
          Spots per day/per month.
        </p>

        <h4>Event Promotion</h4>
        <p>
          This includes a special event that needs only limited sponsorships or
          one time events; 3 spots per day during 6 AM to 9 PM, noon to 3 PM,
          and 6 PM to 9 PM.
        </p>
      </div>
    ];
  }
}
