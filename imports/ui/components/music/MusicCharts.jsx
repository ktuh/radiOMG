import React from 'react';
import PropTypes from 'prop-types';
import Charts from '../../../api/charts/charts_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { default as momentUtil } from 'moment';
import EverAfter from 'react-everafter';

function MusicCharts({ ready, charts }) {
  if (ready) {
    return (
      <div className='music__playlists'>
        <h2>Charts</h2>
        <div>
          <EverAfter.TablePaginator perPage={8} className="playlist-list"
            items={charts} truncate={true} columns={[{
              headerText: 'Chart Title',
              display: ({ title }) => title
            }, {
              headerText: 'Chart Date',
              display: ({ chartDate }) =>
                momentUtil(chartDate).format('MMMM DD, YYYY')
            }, {
              headerText: 'Modified At',
              display: ({ slug, editedAt }) => <a href={`/charts/${slug}`}>
                {momentUtil(editedAt).format('MMMM DD, YYYY HH:mm A')}
              </a>
            }]}/>
        </div>
      </div>);
  }
  else return null;
}

MusicCharts.propTypes = {
  ready: PropTypes.bool,
  charts: PropTypes.array
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('charts');
  return {
    ready: s1.ready(),
    charts: Charts.find({}, { sort: { createdAt: -1 } }).fetch()
  };
})(MusicCharts);
