import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Notifications from
  '../../../api/notifications/notifications_collection.js';
import NotificationItem from './NotificationItem.jsx';
import { withTracker } from 'meteor/react-meteor-data';

class NotificationsBox extends Component {
  static propTypes = {
    notifications: PropTypes.array
  }

  render() {
    return [<a href="#" className="dropdown-toggle" data-toggle="dropdown">
      Notifications
      {this.props.notifications.length > 0 &&
        <span className="badge badge-inverse">
          {this.props.notifications.length}</span> || null}
      <b className="caret"></b>
    </a>,
    <ul className="notification dropdown-menu">
      {this.props.notifications.length > 0 &&
        this.props.notifications.map((notification) =>
          <NotificationItem commenterName={notification.commenterName}
            notificationPostPath={notification.notificationPostPath}
            _id={notification._id} />) ||
            <li><span>No Notifications</span></li> }
    </ul>];
  }
}

export default withTracker(() => {
  return {
    notifications:
      Notifications.find({ userId: Meteor.userId(), read: false }).fetch()
  };
})(NotificationsBox);
