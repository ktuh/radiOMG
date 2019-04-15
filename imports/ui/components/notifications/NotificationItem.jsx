import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notifications from
  '../../../api/notifications/notifications_collection.js';

export default class NotificationItem extends Component {
  static propTypes = {
    _id: PropTypes.string,
    notificationPostPath: PropTypes.string,
    commenterName: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    Notifications.update(this.props._id, { $set: { read: true } });
  }

  render() {
    return (
      <li>
        <a onClick={this.handleClick}
          href={this.props.notificationPostPath}>
          <strong>{this.props.commenterName}</strong> commented on your post
        </a>
      </li>
    );
  }
}
