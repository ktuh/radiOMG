import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PartyItem extends Component {
  static propTypes = {
    party: PropTypes.object
  }

  render() {
    return (
      <div className='events-item'>
        <a href={'/events/' + this.props.party.slug}>
          <img className='events-item__photo'
            src={this.props.party.thumbnail || this.props.party.flyerFront.url}
          />
        </a>
        <p><a href={'/events/' + this.props.party.slug}>
          {this.props.party.title}</a></p>
      </div>
    );
  }
}
