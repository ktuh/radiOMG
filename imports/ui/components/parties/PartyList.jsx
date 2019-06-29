import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import PartyItem from './PartyItem.jsx';
import Parties from '../../../api/parties/parties_collection.js';
import { Meteor } from 'meteor/meteor';
import { Metamorph } from 'react-metamorph';

function PartyList({ ready, parties }) {
  if (ready) return [
    <Metamorph title='Events - KTUH FM Honolulu | Radio for the People'
      description="KTUH Events" image='https://ktuh.org/img/ktuh-logo.jpg' />,
    <h2 className='general__header' key='header-title'>Events</h2>,
    <div className='events-list' key='event-list'>
      {parties.length && parties.map((party) =>
        <PartyItem key={party._id} party={party} />
      ) || <p>No events at this time. Check back later.</p>}
    </div>
  ]
  else return null;
}

PartyList.propTypes = {
  ready: PropTypes.bool,
  parties: PropTypes.array
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('approvedParties');

  return {
    ready: s1.ready(),
    parties: Parties.find({}).fetch()
  };
})(PartyList);
