import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileEditForm from './ProfileEditForm.jsx';
import Profiles from '../../../api/users/profiles_collection.js';
import { withTracker } from 'meteor/react-meteor-data';

class ProfileEdit extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    profile: PropTypes.object
  }

  render() {
    if (this.props.ready) {
      return (
        <div id="main">
          <h2 className='general__header'>Edit Profile</h2>
          <div className='profile-edit'>
            {this.props.profile &&
            <ProfileEditForm doc={this.props.profile} /> ||
            <p>Please login (or signup) to edit your profile.</p>}
          </div>
        </div>
      );
    }
    else return null;
  }
}

export default withTracker(() => {
  var userId = Meteor.userId(), s1 = null;
  if (userId) s1 = Meteor.subscribe('profileData', userId);

  return {
    ready: s1.ready(),
    profile: Profiles.findOne({ userId: userId })
  }
})(ProfileEdit);
