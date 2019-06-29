import React from 'react';
import PropTypes from 'prop-types';
import Playlists from '../../../api/playlists/playlists_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { default as momentUtil } from 'moment';
import EverAfter from 'react-everafter';

function MusicPlaylists({ ready, playlists }){
  function showFromId(showId) {
    return Shows.findOne({ showId });
  }

  if (ready) {
    return <div className='music__playlists'>
      <h2>Playlists</h2>
      <div>
        <EverAfter.TablePaginator items={playlists} perPage={7}
          truncate={true} className="playlist-list" columns={[{
            headerText: '',
            display: ({ showId }) =>
              <img className="music__playlist-image" height="150px"
                src={showId && showFromId(showId).featuredImage.url ||
                  '/mstile-150x150.png'} />
          },
          {
            headerText: 'Show',
            display: ({ showId }) => showId > -1 &&
              showFromId(showId).showName || 'Sub Show'
          },
          {
            headerText: 'Date',
            display: ({ spinPlaylistId, showDate }) =>
              <a href={`/playlists/${spinPlaylistId}`}>
                {momentUtil(showDate).format('MMMM DD, YYYY')}</a>
          }]}/>
      </div>
    </div>;
  }
  else return null;
}

MusicPlaylists.propTypes = {
  ready: PropTypes.bool,
  playlists: PropTypes.array
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('playlists'), s2 = Meteor.subscribe('shows');

  return {
    ready: s1.ready() && s2.ready(),
    playlists: Playlists.find({}, { sort: { showDate: -1 } }).fetch()
  }
})(MusicPlaylists);
