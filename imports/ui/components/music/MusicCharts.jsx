import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Charts from '../../../api/charts/charts_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import EverAfter from 'react-everafter';

class MusicCharts extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    charts: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  render() {
    if (this.props.ready) {
      return (
        <div className='music__playlists'>
          <h2>Charts</h2>
          <div>
            <EverAfter.TablePaginator perPage={8} className="playlist-list"
              items={this.props.charts} truncate={true} columns={[{
                headerText: 'Chart Title',
                display: (item) => item.title
              }, {
                headerText: 'Chart Date',
                display: item =>
                  momentUtil(item.chartDate).format('MMMM DD, YYYY')
              }, {
                headerText: 'Modified At',
                display: (item) => <a href={`/charts/${item.slug}`}>
                  {momentUtil(item.editedAt)
                    .format('MMMM DD, YYYY HH:mm A')}
                </a>
              }]}/>
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
    charts: Charts.find({}, { sort: { createdAt: -1 } }).fetch()
  };
})(MusicCharts);
