import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Errors from '../../../../client/helpers/errors.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

const IGNORE_CONNECTION_ISSUE_KEY = 'ignoreConnectionIssue';

class Error extends Component {
  componentDidMount() {
    var error = this.props.error;
    Meteor.setTimeout(function () {
      Errors.remove(error._id);
    }, 6500);
  }

  render() {
    return (
      <div className='alert alert-danger' role='alert'>
        <button type='button' className='close' data-dismiss='alert'>
          &times;
        </button>
        {this.props.error.message}
      </div>
    );
  }
}

class ErrorsBox extends Component {
  connected() {
    return Session.get(IGNORE_CONNECTION_ISSUE_KEY) ||
      Meteor.status().connected;
  }

  render() {
    var self = this, connected = this.connected.bind(this);
    return [
      <div className='notifications' key='notifications-box'>
        {(() => {
          if (!connected()) return (
            <div className='notification'>
              <span className='title-notification'>Trying to connect</span>
              <span className='glyphicon glyphicon-refresh'></span>
            </div>);
          else return null;
        })()}
        {this.props.notifications.map((item) => (
          <div className='notification' key='item'>
            <a className='btn-primary js-notification-action'>{item.action}</a>
            <div className='title-notification'>{item.title}</div>
          </div>
        ))}
      </div>,
      <div className='errors' key='errors-box'>
        {this.props.errors.map((item) =>
          <Error message={item} key={item._id} />
        )}
      </div>];
  }
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
