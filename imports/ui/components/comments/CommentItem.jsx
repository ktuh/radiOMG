import React from 'react';
import PropTypes from 'prop-types';
import { default as moment } from 'moment';

export default function CommentItem({ comment: { body, submitted, author } }) {
  function timeDiff() {
    var timeStr = submitted.toString().substring(0, 24),
      timestamp = moment(timeStr, 'ddd MMM DD YYYY HH:mm:ss'), now = moment(),
      diff = moment.duration(timestamp.diff(now), 'milliseconds')
        .humanize(true);
    return diff;
  }

  return (
    <li className='comment'>
      <p className='comment__text'>{body}</p>
      <p>
        <span className='comment__author'>{author}</span>
        <span className='comment__date'>{timeDiff()}</span>
      </p>
    </li>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object
}
