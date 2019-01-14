import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Playlists from '../../../api/playlists/playlists_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import EverAfter from 'react-everafter';

class MusicPlaylists extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    playlists: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  showFromId(id) {
    return Shows.findOne({ showId: id });
  }

  render() {
    var showFromId = this.showFromId;

    if (this.props.ready) {
      return (
        <div className='music__playlists'>
          <h2>Playlists</h2>
          <div>
            <EverAfter.TablePaginator items={this.props.playlists} perPage={7}
              truncate={true} className="playlist-list" columns={[{
                headerText: '',
                display: (item) =>
                  <img className="music__playlist-image" height="150px"
                    src={item.showId &&
                      showFromId(item.showId).featuredImage.url ||
                      '/mstile-150x150.png'} />
              },
              {
                headerText: 'Show',
                display: (item) => item.showId > -1 &&
                  showFromId(item.showId).showName || 'Sub Show'
              },
              {
                headerText: 'Date',
                display: (item) =>
                  <a href={`/playlists/${item.spinPlaylistId}`}>
                    {momentUtil(item.showDate).format('MMMM DD, YYYY')}</a>
              }]}/>
          </div>
        </div>
      );
    }
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('playlists'), s2 = Meteor.subscribe('shows');

  return {
    ready: s1.ready() && s2.ready(),
    playlists: Playlists.find({}, { sort: { showDate: -1 } }).fetch()
  }
})(MusicPlaylists);
