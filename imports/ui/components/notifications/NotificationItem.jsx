import React, { Component } from 'react';

export default class NotificationItem extends Component {
  handleClick(event) {
    Notifications.update(this.props._id, { $set: { read: true } });
  }

  render() {
    return (
      <li>
        <a onClick={this.handleClick.bind(this)}
          href={this.props.notificationPostPath}>
          <strong>{this.props.commenterName}</strong> commented on your post
        </a>
      </li>
    );
  }
}
