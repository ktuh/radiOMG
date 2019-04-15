import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';
import { Metamorph } from 'react-metamorph';

class SSRShowPage extends Component {
  static propTypes = {
    show: PropTypes.object
  }

  day(num) {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
      'Saturday'][num];
  }

  timeBeautify(startHour, startMinute, endHour, endMinute) {
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
    return momentUtil(moment(momentUtil(startHour + ':' + startMinute, 'HH:mm'),
      'Pacific/Honolulu')).format(ap) +
      '-' + momentUtil(moment(momentUtil(endHour + ':' + endMinute, 'HH:mm'),
      'Pacific/Honolulu')).format('h:mmA');
  }

  time(t) {
    return momentUtil(t).format('ddd. MMM. D, YYYY');
  }

  timeBeautify2(time) {
    return momentUtil(moment(momentUtil(time),
      'Pacific/Honolulu')).format('h:mma');
  }

  render() {
    return [
      <Metamorph title={this.props.show.showName + ' - KTUH FM Honolulu' +
        ' | Radio for the People'} description={this.props.show.showName +
        ' on KTUH'} image={this.props.show.thumbnail ||
        'https://ktuh.org/img/ktuh-logo.jpg'} />,
      <h2 className='general__header' key='header-title'>
        <b>{this.props.show.showName} / {this.props.show.host}</b>
      </h2>,
      <div className='show__link' key='shows-link'>
        <a href='/shows' className='back-to'>← Show Schedule</a>
      </div>,
      <div className="show__wrapper" key='show-wrapper'>
        <div className="show__content">
          {this.props.show.featuredImage &&
          <div className='show__image-div'>
            <img className='show__image'
              src={this.props.show.thumbnail ||
                (this.props.show.featuredImage &&
                  this.props.show.featuredImage.url)} />
          </div> || null}
          <div className='show__info'>
            <h5 className='show__time'>
              {this.day(this.props.show.startDay)}{'s from '}
              {this.timeBeautify(this.props.show.startHour,
                this.props.show.startMinute, this.props.show.endHour,
                this.props.show.endMinute)}
            </h5>
            {this.props.show.genres && this.props.show.genres.length > 0 &&
            <div className='show-item__genres'>
              <span className='glyphicon glyphicon-music'></span>
              {' ' +  this.props.show.genres.join(', ')}
            </div> || null}
            <p className='show__body' dangerouslySetInnerHTML=
              {{ __html: this.props.show.body }} />
          </div>
        </div>
      </div>
    ];
  }
}

export default (show) => <SSRShowPage show={show} />;
