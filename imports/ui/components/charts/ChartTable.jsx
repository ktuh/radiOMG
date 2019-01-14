import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChartTableRow extends Component {
  static propTypes = {
    track: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td className='playlist__title'>{this.props.track.index + 1}</td>
        <td className='playlist__title'>{this.props.track.artist}</td>
        <td className='playlist__title'>{this.props.track.release || 'N/A'}</td>
        <td className='playlist__title'>{this.props.track.label}</td>
      </tr>
    );
  }
}

export default class ChartTable extends Component {
  static propTypes = {
    tracks: PropTypes.array
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="playlist">
        <thead>
          <tr className="playlist__info-row">
            <td><b>#</b></td>
            <td><b>Artist</b></td>
            <td><b>Release</b></td>
            <td><b>Label</b></td>
          </tr>
        </thead>
        <tbody>
          {this.props.tracks.map((track, i) =>
            <ChartTableRow key={
              `${i}. ${track.artist} - ${track.artist} [${track.label}]`}
            track={track} />)}
        </tbody>
      </table>
    );
  }
}
