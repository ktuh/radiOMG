import React, { Component } from 'react';
import Playlists from '../../../api/playlists/playlists_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { pages } from '../../../startup/lib/helpers.js';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import CustomPaginator from '../reusables/CustomPaginator.jsx';

class MusicPlaylists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  handleClick(page) {
    this.setState({ currentPage: page });
  }

  handlePreviousClick(event) {
    this.setState({ currentPage: this.state.currentPage - 1 });
  }

  handleNextClick(event) {
    this.setState({ currentPage: this.state.currentPage + 1 });
  }

  showFromId(id) {
    return Shows.findOne({ showId: id });
  }

  render() {
    var showFromId = this.showFromId, self = this,
      handleClick = this.handleClick.bind(this),
      handleNextClick = this.handleNextClick.bind(this),
      handlePreviousClick = this.handlePreviousClick.bind(this);

    if (this.props.ready) {
      return (
        <div className='music__playlists'>
          <h2>Playlists</h2>
          <div>
            <table className="playlist-list" border="1">
              <thead>
                <tr>
                  <td colSpan="2"><b>Show</b></td>
                  <td><b>Date</b></td>
                </tr>
              </thead>
              <tbody>
                {(self.props.pages)[self.state.currentPage - 1].map(
                  (playlist) => (
                    <tr>
                      <td>
                        <img className="music__playlist-image" height="150px"
                          src={playlist.showId &&
                            showFromId(playlist.showId).featuredImage.url ||
                            '/mstile-150x150.png'} />
                      </td>
                      <td>
                        {playlist.showId > -1 &&
                          showFromId(playlist.showId).showName || 'Sub Show'}
                      </td>
                      <td>
                        <a href={`/playlists/${playlist.spinPlaylistId}`}>
                          {momentUtil(playlist.showDate)
                            .format('MMMM DD, YYYY')}</a>
                      </td>
                    </tr>))}
              </tbody>
            </table>
            <div className='news-list__paginator'>
              <CustomPaginator currentPage={this.state.currentPage}
                pages={this.props.pages} handleClick={handleClick}
                handleNextClick={handleNextClick}
                handlePreviousClick={handlePreviousClick} />
            </div>
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
    pages: pages(Playlists.find({}, { sort: { showDate: -1 } }).fetch(), 7)
  }
})(MusicPlaylists);
