import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PartyItem from './PartyItem.jsx';
import Parties from '../../../api/parties/parties_collection.js';
import { Meteor } from 'meteor/meteor';

class PartyList extends Component {
  render() {
    if (this.props.ready) return [
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
