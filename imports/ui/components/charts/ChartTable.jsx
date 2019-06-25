import React from 'react';
import PropTypes from 'prop-types';

function ChartTableRow({ track }) {
  return (
    <tr>
      <td className='playlist__title'>{track.index + 1}</td>
      <td className='playlist__title'>{track.artist}</td>
      <td className='playlist__title'>{track.release || 'N/A'}</td>
      <td className='playlist__title'>{track.label}</td>
    </tr>
  );
}

export default function ChartTable({ tracks }) {
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
        {tracks.map((track, i) =>
          <ChartTableRow key={
            `${i}. ${track.artist} - ${track.artist} [${track.label}]`}
          track={{ ...track, index: i }} />)}
      </tbody>
    </table>
  );
}

ChartTable.propTypes = {
  tracks: PropTypes.array
}

ChartTableRow.propTypes = {
  track: PropTypes.object
}
