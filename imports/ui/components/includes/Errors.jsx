import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Errors from '../../../../client/helpers/errors.js';
import Notifications from
  '../../../api/notifications/notifications_collection.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

const IGNORE_CONNECTION_ISSUE_KEY = 'ignoreConnectionIssue';

function Error({ error }) {
  useEffect(function() {
    Meteor.setTimeout(function () {
      Errors.remove(error._id);
    }, 6500);
  });

  return (
    <div className='alert alert-danger' role='alert'>
      <button type='button' className='close' data-dismiss='alert'>
        &times;
      </button>
      {error.message}
    </div>
  );
}

function ErrorsBox({ notifications, errors }) {
  function connected() {
    return Session.get(IGNORE_CONNECTION_ISSUE_KEY) ||
      Meteor.status().connected;
  }

  return [
    <div className='notifications' key='notifications-box'>
      {!connected() ? (
        <div className='notification'>
          <span className='title-notification'>Trying to connect</span>
          <span className='glyphicon glyphicon-refresh'></span>
        </div>) : null}
      {notifications.map(({ action, title }) => (
        <div className='notification' key='item'>
          <a className='btn-primary js-notification-action'>{action}</a>
          <div className='title-notification'>{title}</div>
        </div>
      ))}
    </div>,
    <div className='errors' key='errors-box'>
      {errors.map((item) =>
        <Error message={item} key={item._id} />
      )}
    </div>];
}

Error.propTypes = {
  error: PropTypes.object
}

ErrorsBox.propTypes = {
  notifications: PropTypes.array,
  errors: PropTypes.array
}

export default withTracker(() => {
  Meteor.subscribe('notifications');

  return {
    errors: Errors.find().fetch(),
    notifications: Notifications.find({
      userId: Meteor.userId(),
      read: false
    }).fetch()
  };
})(ErrorsBox);
