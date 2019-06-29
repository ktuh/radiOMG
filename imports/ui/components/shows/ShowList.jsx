import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Shows from '../../../api/shows/shows_collection.js';
import { getLocalTime } from '../../../startup/lib/helpers.js';
import { $ } from 'meteor/jquery';
import { withTracker } from 'meteor/react-meteor-data';
import ShowItem from './ShowItem.jsx';
import { Metamorph } from 'react-metamorph';

function ShowList({ ready }) {
  let [, setState] = useState({
    day: $.inArray(FlowRouter.getQueryParam('day'),
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday'])
  });


  function active(d) {
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

  function daysShows() {
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

  function handleClick(event) {
    event.preventDefault();
    return function(day) {
      setState({ day });
    }
  }

  if (ready)
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
              <a href={`/shows?day=${day}` } onClick={(e) => handleClick(e)(i)}>
                <span className={`shows__day ${active(day)}`}>{day}</span>
              </a>
            );
          })}
        </div>
        <div className='shows__days shows__days__narrow'>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday'].map(function(day, i) {
            return (
              <a href={`/shows?day=${day}` }
                onClick={(e) => handleClick(e)(i)}>
                <span className={`shows__day ${active(day)}`}>
                  {day.substring(0,3)}</span>
              </a>
            );
          })}
        </div>
        {daysShows().map((show) => <ShowItem show={show} key={show._id} />)}
      </div>
    ];
  else return null;
}

ShowList.propTypes = {
  ready: PropTypes.bool
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('activeShows'),
    s2 = Meteor.subscribe('djs');

  return {
    ready: s1.ready() && s2.ready()
  }
})(ShowList);
