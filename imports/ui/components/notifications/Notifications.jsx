import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Notifications from
  '../../../api/notifications/notifications_collection.js';
import NotificationItem from './NotificationItem.jsx';
import { withTracker } from 'meteor/react-meteor-data';

function NotificationsBox({  notifications }) {
  return [<a href="#" className="dropdown-toggle" data-toggle="dropdown">
    Notifications
    {notifications.length &&
      <span className="badge badge-inverse">
        {notifications.length}</span> || null}
    <b className="caret"></b>
  </a>,
  <ul className="notification dropdown-menu">
    {notifications.length && notifications.map(
      ({ commenterName, notificationPostPath, _id }) =>
        <NotificationItem {...{ commenterName, notificationPostPath, _id }} />)
        || <li><span>No Notifications</span></li>}</ul>];
}

NotificationsBox.propTypes = {
  notifications: PropTypes.array
}

export default withTracker(() => {
  return {
    notifications:
      Notifications.find({ userId: Meteor.userId(), read: false }).fetch()
  };
})(NotificationsBox);
