import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nextShow, usernameById, displayNameById }
  from '../../../startup/lib/helpers.js';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import { withTracker } from 'meteor/react-meteor-data';

class HomeSidebarNext extends Component {
  static propTypes = {
    ready: PropTypes.bool
  }

  startEndTime(startHour, startMinute, endHour, endMinute) {
    if (startMinute === 1) {
      startMinute--;
    }
    if (endMinute === 59) {
      endHour = (endHour + 1) % 24;
      endMinute = 0;
    }
    var sp = '';
    if (startHour > endHour) sp = 'h:mm A'
    else sp = 'h:mm';
    return momentUtil(startHour + ':' + startMinute, 'HH:mm')
      .format(sp) + '-' +
    momentUtil(endHour + ':' + endMinute, 'HH:mm').format('h:mm A');
  }

  render() {
    if (this.props.ready)
      return (<div className='home__next-show'>
        <div className='home__next-show-deets'>
          <p className="home__next-on-air">Next On Air</p>
          <p className='home__next-show-name'>
            <a href={'/shows/' + nextShow().slug}>
              {nextShow().showName}
            </a>
          </p>
          <p className='home__next-show-host'>
            hosted by <a href={'/profile/' +
              usernameById(nextShow().userId)}>
              {displayNameById(nextShow().userId)}</a>
          </p>
          <p className='home__next-show-time'>
            {this.startEndTime(nextShow().startHour,
              nextShow().startMinute, nextShow().endHour,
              nextShow().endMinute)}
          </p>
        </div>
        <a href="/shows">
          <div className=
            'home__next-show-link color-button transparent-button'>
            Program Schedule
          </div>
        </a>
      </div>);
    else return null;
  }
}

export default withTracker(() => {
  var s2, s3, s1 = Meteor.subscribe('nextOnAir', {
    onReady: function() {
      var show = nextShow();
      var userId = show && show.userId;
      if (show) {
        s2 = Meteor.subscribe('profileData', userId);
        s3 = Meteor.subscribe('userById', userId);
      }
    }
  });

  return {
    ready: s1.ready() && (s2 && s2.ready()) && (s3 && s3.ready())
  };
})(HomeSidebarNext);
