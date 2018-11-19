import React, { Component } from 'react';

class ChartTableRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td className='playlist__title'>{this.props.index + 1}</td>
        <td className='playlist__title'>{this.props.artist}</td>
        <td className='playlist__title'>{this.props.release || 'N/A'}</td>
        <td className='playlist__title'>{this.props.label}</td>
      </tr>
    );
  }
}

export default class ChartTable extends Component {
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
            index={i} artist={track.artist} release={track.release || undefined}
            label={track.label} />)}
        </tbody>
      </table>
    );
  }
}
