import React, { Component } from 'react';

export default class PartyItem extends Component {
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
