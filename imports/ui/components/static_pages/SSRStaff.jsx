import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profiles from '../../../api/users/profiles_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { Helmet } from 'react-helmet';
import { Meteor } from 'meteor/meteor';

class StaffItem extends Component {
  static propTypes = {
    dj: PropTypes.object,
    ready: PropTypes.bool
  }

  constructor(props) {
    super(props);
  }

  usernameById(userId) {
    return Meteor.users.findOne({ _id: userId }).username;
  }

  render() {
    var usernameById = this.usernameById.bind(this);

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
        <Helmet key="metadata">
          <title>Staff - KTUH FM Honolulu | Radio for the People</title>
          <meta property="og:title"
            content="Staff - KTUH FM Honolulu | Radio for the People" />
          <meta property="og:description" content="KTUH Staff List" />
          <meta name="twitter:title" content=
            'Staff - KTUH FM Honolulu | Radio for the People' />
          <meta name="twitter:url" content="https://ktuh.org" />
          <meta name="twitter:description" content="KTUH Staff List" />
          <meta name="twitter:site" content="@ktuh_fm" />
          <meta name="twitter:image" content={
            'https://ktuh.org/img/ktuh-logo.jpg'
          } />
          <meta name="twitter:creator" content="@ktuh_fm" />
          <meta property="description" content="KTUH Staff List" />
        </Helmet>,
        <h2 className='general__header'>KTUH Staff</h2>,
        <div className='staff__content' key="staff-content">
          {this.props.djs.map((dj) => {
            return <StaffItem key={dj.userId} dj={dj} />
          })}
        </div>
      ];
    }
    else return null;
  }
}

export default <Staff
  ready={true}
  djs={Profiles.find({
    userId: { $in: Shows.find().fetch().map((show) => show.userId) }
  }, { sort: { name: 1 } }).fetch() } />
