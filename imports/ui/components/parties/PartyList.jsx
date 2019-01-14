import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import PartyItem from './PartyItem.jsx';
import Parties from '../../../api/parties/parties_collection.js';
import { Meteor } from 'meteor/meteor';
import { Helmet } from 'react-helmet';

class PartyList extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    parties: PropTypes.array
  }

  render() {
    if (this.props.ready) return [
      <Helmet key="metadata">
        <title>Events - KTUH FM Honolulu | Radio for the People</title>
        <meta property="og:title"
          content="Events - KTUH FM Honolulu | Radio for the People" />
        <meta property="og:description" content="KTUH Events" />
        <meta name="twitter:title" content={'Events' +
          ' - KTUH FM Honolulu | Radio for the People'} />
        <meta name="twitter:url" content="https://ktuh.org" />
        <meta name="twitter:description" content="KTUH Events" />
        <meta name="twitter:site" content="@ktuh_fm" />
        <meta name="twitter:image" content={
          'https://ktuh.org/img/ktuh-logo.jpg'
        } />
        <meta name="twitter:creator" content="@ktuh_fm" />
        <meta property="description" content="KTUH Events" />
      </Helmet>,
      <h2 className='general__header' key='header-title'>Events</h2>,
      <div className='events-list' key='event-list'>
        {this.props.parties.length > 0 &&
          this.props.parties.map((party) =>
            <PartyItem key={party._id} party={party} />
          ) || <p>No events at this time. Check back later.</p>}
      </div>
    ]
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('approvedParties');

  return {
    ready: s1.ready(),
    parties: Parties.find({}).fetch()
  };
})(PartyList);
