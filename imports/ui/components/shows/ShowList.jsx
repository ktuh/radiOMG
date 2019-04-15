import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Shows from '../../../api/shows/shows_collection.js';
import { getLocalTime } from '../../../startup/lib/helpers.js';
import { $ } from 'meteor/jquery';
import { withTracker } from 'meteor/react-meteor-data';
import ShowItem from './ShowItem.jsx';
import { Metamorph } from 'react-metamorph';

class ShowList extends Component {
  static propTypes = {
    ready: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      day: $.inArray(FlowRouter.getQueryParam('day'),
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
          'Friday', 'Saturday'])
    };
  }

  active(d) {
    var day = FlowRouter.getQueryParam('day');
    var daze = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday'];
    var date = getLocalTime();

    // We're not routed to a particular day of the week
    if (day === undefined || $.inArray(day, daze) === -1)
      if (d === daze[date.day()]) return 'active'; else return '';
    else {
      if (d === daze[$.inArray(day, daze)]) return 'active'; else return '';
    }
  }

  daysShows() {
    var day = FlowRouter.getQueryParam('day');
    var daze = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday'];
    var date = getLocalTime();
    var dayNum = 0;
    if (day === undefined || $.inArray(day, daze) < 0) {
      dayNum = date.day();
    } else {
      dayNum = $.inArray(day, daze);
    }
    return Shows.find({ startDay: dayNum },
      { sort: { startHour: 1, startMinute: 1 } }).fetch();
  }

  handleClick(event) {
    event.preventDefault();
    var self = this;
    return function(day) {
      self.setState({ day: day });
    }
  }

  render() {
    var handleClick = this.handleClick.bind(this),
      active = this.active.bind(this);

    if (this.props.ready)
      return [
        <Metamorph title=
          'Show Schedule - KTUH FM Honolulu | Radio for the People' description=
          'Show Schedule on KTUH' image='https://ktuh.org/img/ktuh-logo.jpg' />,
        <h2 className='general__header' key='header'>Show Schedule</h2>,
        <div className='shows'>
          <div className='shows__days shows__days__wide'>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
              'Friday', 'Saturday'].map(function(day, i) {
              return (
                <a href={'/shows?day=' + day }
                  onClick={(e) => handleClick(e)(i)}>
                  <span className={`shows__day ${active(day)}`}>
                    {day}</span>
                </a>
              );
            })}
          </div>
          <div className='shows__days shows__days__narrow'>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
              'Friday', 'Saturday'].map(function(day, i) {
              return (
                <a href={'/shows?day=' + day }
                  onClick={(e) => handleClick(e)(i)}>
                  <span className={`shows__day ${active(day)}`}>
                    {day.substring(0,3)}</span>
                </a>
              );
            })}
          </div>
          {this.daysShows().map((show) =>
            <ShowItem show={show} key={show._id} />)}
        </div>
      ];
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('activeShows'),
    s2 = Meteor.subscribe('djs');

  return {
    ready: s1.ready() && s2.ready()
  }
})(ShowList);
