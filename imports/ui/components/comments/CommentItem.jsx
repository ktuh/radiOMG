import React from 'react';
import PropTypes from 'prop-types';
import { default as moment } from 'moment';

export default function CommentItem({ comment: { body, submitted, author } }) {
  function timeDiff() {
    var timeStr = submitted.toString().substring(0, 24);
    var timestamp = moment(timeStr, 'ddd MMM DD YYYY HH:mm:ss');
    var now = moment();
    var diff = moment.duration(timestamp.diff(now), 'milliseconds')
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
