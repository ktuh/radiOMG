import React, { Component } from 'react';
import Charts from '../../../api/charts/charts_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { pages } from '../../../startup/lib/helpers.js';
import { Meteor } from 'meteor/meteor';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import CustomPaginator from '../reusables/CustomPaginator.jsx';

class MusicCharts extends Component {
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

  render() {
    var self = this, handleClick = this.handleClick.bind(this),
      handleNextClick = this.handleNextClick.bind(this),
      handlePreviousClick = this.handlePreviousClick.bind(this);

    if (this.props.ready) {
      return (
        <div className='music__playlists'>
          <h2>Charts</h2>
          <div>
            <table className="playlist-list" border="1">
              <thead>
                <tr>
                  <td><b>Chart Title</b></td>
                  <td><b>Chart Date</b></td>
                  <td><b>Modified At</b></td>
                </tr>
              </thead>
              <tbody>
                {(this.props.pages)[this.state.currentPage - 1].map((chart) => (
                  <tr>
                    <td>{chart.title}</td>
                    <td>
                      {momentUtil(chart.chartDate).format('MMMM DD, YYYY')}</td>
                    <td>
                      <a href={`/charts/${chart.slug}`}>
                        {momentUtil(chart.editedAt)
                          .format('MMMM DD, YYYY HH:mm A')}
                      </a>
                    </td>
                  </tr>))}
              </tbody>
            </table>
            <CustomPaginator currentPage={this.state.currentPage}
              pages={this.props.pages} handleClick={handleClick}
              handleNextClick={handleNextClick}
              handlePreviousClick={handlePreviousClick} />
          </div>
        </div>);
    }
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('charts');
  return {
    ready: s1.ready(),
    pages: pages(Charts.find({}, { sort: { createdAt: -1 } }).fetch(), 8)
  };
})(MusicCharts);
