import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';

export default class ShowItem extends Component {
  static propTypes = {
    show: PropTypes.object
  }

  formattedTime(startHour, startMinute, endHour, endMinute) {
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
    let time = moment(startHour + ':' + startMinute, 'HH:m').format(amPm)
      .replace('M', '') + '-' + moment(endHour + ':' + endMinute,
      'HH:mm').format('hA');
    return time.substr(0, time.length-1);
  }

  profileLink(id) {
    var user = Meteor.users.findOne({ _id: id });
    if (user !== undefined)
      return '/profile/' + user.username;
  }

  render() {
    return (
      <div className='show-item'>
        <h4 className='show-item__time'>
          {this.formattedTime(this.props.show.startHour,
            this.props.show.startMinute, this.props.show.endHour,
            this.props.show.endMinute)}
        </h4>
        <div className='show-item__image-div'>
          <a href={'/shows/' + this.props.show.slug}>
            <img className='show-item__image'
              src={((this.props.show.thumbnail || null) ||
                  (this.props.show.featuredImage &&
                  this.props.show.featuredImage.url || null)) ||
                  (!this.props.show.thumbnail &&
                  !this.props.show.featuredImage &&
                  'https://ktuh.org/img/ktuh-logo.jpg' || null)} />
          </a>
        </div>
        <div className='show-item__info-container'>
          <div className='show-item__info'>
            <h5 className='show-item__info-time'>
              {this.formattedTime(this.props.show.startHour,
                this.props.show.startMinute, this.props.show.endHour,
                this.props.show.endMinute)}
            </h5>
            <h4>
              <a href={'/shows/' + this.props.show.slug}>
                {this.props.show.showName}
              </a>
            </h4>
            <h5>
              Hosted by <a className='show-item__host purple-text'
                href={this.profileLink(this.props.show.userId)}>
                {this.props.show.host}
              </a>
            </h5>
            <p>{this.props.show.synopsis}</p>
            {this.props.show.genres && this.props.show.genres.length > 0 &&
              <div className='show-item__genres'>
                <span className='glyphicon glyphicon-music'></span>
                {' ' + this.props.show.genres.join(', ')}
              </div> || null }
          </div>
        </div>
      </div>
    );
  }
}
