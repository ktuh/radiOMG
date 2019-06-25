import React from 'react';
import { object } from 'prop-types';
import { default as momentUtil } from 'moment';
import moment from 'moment-timezone';
import { Metamorph } from 'react-metamorph';

function SSRShowPage({ show }) {
  function day(num) {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
      'Saturday'][num];
  }

  function timeBeautify(startHour, startMinute, endHour, endMinute) {
    if (startMinute === 1) {
      startMinute--;
    }
    if (endMinute === 59) {
      endHour = (endHour + 1) % 24;
      endMinute = 0;
    }
    var ap = startHour > endHour;
    if (ap) ap = 'h:mmA';
    else ap = 'h:mm';
    return `${momentUtil(moment(momentUtil(`${startHour}:${startMinute}`,
      'HH:mm'),'Pacific/Honolulu')).format(ap)
    }-${momentUtil(moment(momentUtil(`${endHour}:${endMinute}`, 'HH:mm'),
      'Pacific/Honolulu')).format('h:mmA')}`;
  }

  var { showName, thumbnail, host, featuredImage, startDay, startHour,
    startMinute, endHour, endMinute, genres, body } = show;

  return [
    <Metamorph title={`${showName} - KTUH FM Honolulu` +
      ' | Radio for the People'} description={`${showName} on KTUH`}
    image={thumbnail || 'https://ktuh.org/img/ktuh-logo.jpg'} />,
    <h2 className='general__header' key='header-title'>
      <b>{showName} / {host}</b>
    </h2>,
    <div className='show__link' key='shows-link'>
      <a href='/shows' className='back-to'>← Show Schedule</a>
    </div>,
    <div className="show__wrapper" key='show-wrapper'>
      <div className="show__content">
        {featuredImage &&
        <div className='show__image-div'>
          <img className='show__image'
            src={thumbnail || (featuredImage && featuredImage.url)} />
        </div> || null}
        <div className='show__info'>
          <h5 className='show__time'>
            {`${day(startDay)}'s from ${timeBeautify(
              startHour, startMinute, endHour, endMinute)}`}
          </h5>
          {genres && genres.length &&
          <div className='show-item__genres'>
            <span className='glyphicon glyphicon-music'></span>
            {` ${genres.join(', ')}`}
          </div> || null}
          <p className='show__body' dangerouslySetInnerHTML=
            {{ __html: body }} />
        </div>
      </div>
    </div>
  ];
}

SSRShowPage.propTypes = {
  show: object
}

export default (show) => <SSRShowPage show={show} />;
