import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { default as moment } from 'moment';

export default function ShowItem({ show }) {
  function formattedTime(startHour, startMinute, endHour, endMinute) {
    if (startMinute === 1) {
      startMinute--;
    }
    if (endMinute === 59) {
      endHour = (endHour + 1) % 24;
      endMinute = 0;
    }
    var amPm = startHour > endHour;
    if (amPm) amPm = 'hA';
    else amPm = 'h';
    let time = `${moment(`${startHour}:${startMinute}`, 'HH:m').format(amPm)
      .replace('M', '')}-${moment(`${endHour}:${endMinute}`,
      'HH:mm').format('hA')}`;
    return time.substr(0, time.length-1);
  }

  function profileLink(id) {
    var user = Meteor.users.findOne({ _id: id });
    if (user) return `/profile/${user.username}`;
  }

  return (
    <div className='show-item'>
      <h4 className='show-item__time'>
        {formattedTime(show.startHour, show.startMinute, show.endHour,
          show.endMinute)}
      </h4>
      <div className='show-item__image-div'>
        <a href={`/shows/${show.slug}`}>
          <img className='show-item__image'
            src={((show.thumbnail || null) ||
                (show.featuredImage && show.featuredImage.url || null)) ||
                (!show.thumbnail && !show.featuredImage &&
                'https://ktuh.org/img/ktuh-logo.jpg' || null)} />
        </a>
      </div>
      <div className='show-item__info-container'>
        <div className='show-item__info'>
          <h5 className='show-item__info-time'>
            {formattedTime(show.startHour, show.startMinute, show.endHour,
              show.endMinute)}
          </h5>
          <h4><a href={`/shows/${show.slug}`}>{show.showName}</a></h4>
          <h5>
            Hosted by <a className='show-item__host purple-text'
              href={profileLink(show.userId)}>
              {show.host}
            </a>
          </h5>
          <p>{show.synopsis}</p>
          {show.genres && show.genres.length &&
            <div className='show-item__genres'>
              <span className='glyphicon glyphicon-music'></span>
              {` ${show.genres.join(', ')}`}
            </div> || null }
        </div>
      </div>
    </div>
  );
}

ShowItem.propTypes = {
  show: PropTypes.object
}
