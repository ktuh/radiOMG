import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Profiles from '../../../api/users/profiles_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Metamorph } from 'react-metamorph';
import { usernameById } from '../../../startup/lib/helpers.js';

class StaffItem extends Component {
  static propTypes = {
    dj: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='staff__item'>
        <h4>
          <a className="staff__item-textlink" href=
            {`/profile/${usernameById(this.props.dj.userId)}`}>
            {this.props.dj.name}
          </a>
        </h4>
      </div>
    );
  }
}

class Staff extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    djs: PropTypes.array
  }

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.ready) {
      return [
        <Metamorph title="Staff - KTUH FM Honolulu | Radio for the People"
          description="KTUH Staff List" image=
            'https://ktuh.org/img/ktuh-logo.jpg' />,
        <h2 className='general__header'>KTUH Staff</h2>,
        <div className='staff__content' key="staff-content">
          {this.props.djs.map((dj) => {
            return <StaffItem dj={dj} />
          })}
        </div>
      ];
    }
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('djProfiles'),
    s2 = Meteor.subscribe('djs'),
    s3 = Meteor.subscribe('activeShows');

  return {
    ready: s1.ready() && s2.ready() && s3.ready(),
    djs: Profiles.find({
      userId: { $in: Shows.find().fetch().map((show) => show.userId) }
    }, { sort: { name: 1 } }).fetch()
  };
})(Staff);
