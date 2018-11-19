import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';

export default class PlaylistTable extends Component {
  timeBeautify(time) {
    return momentUtil(
      moment(momentUtil(time), 'Pacific/Honolulu')
    ).format('hh:mma');
  }

  truncated(str) {
    return
    (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{4}/.exec(str) === null) &&
      str.substring(0, str.length - 3) || str;
  }

  songsSorted() {
    var retval = this.props.tracks;
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

  render() {
    return (
      <table className='playlist'>
        <thead>
          <tr className='playlist__info-row'>
            <td>
              {(this.props.onPage &&
                <span className='glyphicon glyphicon-time'></span> || null) ||
              <b>Time</b>}
            </td>
            <td><b>Artist</b></td>
            <td><b>Song</b></td>
          </tr>
        </thead>
        <tbody>
          {this.songsSorted().map((track, i) => {
            return track.start &&
          <tr key=
            {`${track.start} | ${track.artist} - ${track.artist}`}>
            <td className='playlist__timestamp'>{
              this.timeBeautify(track.start)}</td>
            <td className='playlist__artist'>{track.artist}</td>
            <td className='playlist__title'>{track.song}</td>
          </tr> ||
          <tr>
            <td className='playlist__timestamp'>{this.timeBeautify(
              this.truncated(track.Timestamp))}
            </td>
            <td className='playlist__artist'>{track.ArtistName}}</td>
            <td className='playlist__title'>{track.SongName}</td>
          </tr>;
          })}
        </tbody>
      </table>
    );
  }
}
