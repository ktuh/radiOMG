import React from 'react';
import { array, bool } from 'prop-types';
import moment from 'moment-timezone';
import { default as momentUtil } from 'moment';

export default function PlaylistTable({ tracks, onPage }) {
  function timeBeautify(time) {
    return momentUtil(
      moment(momentUtil(time)).tz('Pacific/Honolulu')).format('h:mma');
  }

  function truncated(str) {
    return (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{4}/.exec(str) === null) ?
      str.substring(0, str.length - 3) : str;
  }

  function songsSorted() {
    var retval = tracks;
    if (retval) {
      retval.sort(function(a,b) {
        if (a.start > b.start) {
          return 1;
        }
        else if (a.start < b.start) {
          return -1;
        }
        else return 0;
      });
      return retval;
    }
  }

  return <table className='playlist'>
    <thead>
      <tr className='playlist__info-row'>
        <td>
          {(onPage &&
            <span className='glyphicon glyphicon-time'></span> || null) ||
          <b>Time</b>}
        </td>
        <td><b>Artist</b></td>
        <td><b>Song</b></td>
      </tr>
    </thead>
    <tbody>
      {songsSorted().map(({
        start, artist, song, Timestamp, ArtistName, SongName
      }) => {
        return start && <tr key=
          {`${start} | ${artist} - ${artist}`}>
          <td className='playlist__timestamp'>{
            timeBeautify(start)}</td>
          <td className='playlist__artist'>{artist}</td>
          <td className='playlist__title'>{song}</td>
        </tr> || <tr>
          <td className='playlist__timestamp'>{timeBeautify(
            truncated(Timestamp))}
          </td>
          <td className='playlist__artist'>{ArtistName}}</td>
          <td className='playlist__title'>{SongName}</td>
        </tr>;
      })}</tbody></table>;
}

PlaylistTable.propTypes = {
  tracks: array,
  onPage: bool
};
