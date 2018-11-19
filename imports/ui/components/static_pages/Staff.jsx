import React, { Component } from 'react';
import Profiles from '../../../api/users/profiles_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { withTracker } from 'meteor/react-meteor-data';

class StaffItem extends Component {
  constructor(props) {
    super(props);
  }

  usernameById(userId) {
    return Meteor.users.findOne({ _id: userId }).username;
  }

  render() {
    return (
      <div className='staff__item'>
        <h4>
          <a className="staff__item-textlink" href=
            {`/profile/${this.usernameById.bind(this, this.props.userId)}`}>
            {this.props.name}
          </a>
        </h4>
      </div>
    );
  }
}

class Staff extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.ready) {
      return [
        <h2 className='general__header'>KTUH Staff</h2>,
        <div className='staff__content'>
          {this.props.djs.map((dj) => {
            return <StaffItem userId={dj.userId} name={dj.name}/>
          })}
        </div>
      ];
    }
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('djProfiles');
  var s2 = Meteor.subscribe('djs');
  var s3 = Meteor.subscribe('activeShows');

  return {
    ready: s1.ready() && s2.ready() && s3.ready(),
    djs: Profiles.find({
      userId: { $in: Shows.find().fetch().map((show) => show.userId) }
    }, { sort: { name: 1 } }).fetch()
  };
})(Staff);
