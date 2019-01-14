import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { moment } from 'meteor/momentjs:moment';

export default class CommentItem extends Component {
  static propTypes = {
    comment: PropTypes.object
  }

  timeDiff() {
    var timeStr = this.props.comment.submitted.toString().substring(0, 24);
    var timestamp = moment(timeStr, 'ddd MMM DD YYYY HH:mm:ss');
    var now = moment();
    var diff = moment.duration(timestamp.diff(now), 'milliseconds')
      .humanize(true);
    return diff;
  }

  render() {
    return (
      <li className='comment'>
        <p className='comment__text'>{this.props.comment.body}</p>
        <p>
          <span className='comment__author'>{this.props.comment.author}</span>
          <span className='comment__date'>{this.timeDiff()}</span>
        </p>
      </li>
    );
  }
}
