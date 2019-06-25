import React from 'react';
import { bool, array } from 'prop-types';
import Charts from '../../../api/charts/charts_collection.js';
import ChartsSidebar from './ChartsSidebar.jsx';
import ChartTable from './ChartTable.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { default as momentUtil } from 'moment';
import moment from 'moment-timezone';
import { Metamorph } from 'react-metamorph';

function ChartsList({ latestCharts }) {
  function dateFmt(date) {
    return momentUtil(moment(date, 'Pacific/Honolulu')).format('MMMM DD, YYYY');
  }

  return [
    <Metamorph title="Charts - KTUH FM Honolulu | Radio for the People"
      description="KTUH Charts" image='https://ktuh.org/img/ktuh-logo.jpg' />,
    <h2 className='general__header' key='header-title'>Charts</h2>,
    <div className='playlist-list__latest' key='playlist-list-conent'>
      {latestCharts.map(({ title, chartDate, tracks, _id, slug }) =>
        [
          <h3 className='playlist__show-name' key={_id}>
            <a href={`/charts/${slug}`}>
              {`${title} - ${dateFmt(chartDate)}`}
            </a>
          </h3>,
          <ChartTable tracks={tracks} key={`${_id} tracks`}/>
        ])}
    </div>,
    <ChartsSidebar key="chart-sidebar" />
  ];
}

ChartsList.propTypes = {
  ready: bool,
  latestCharts: array
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('chartsLimited',
    { limit: 5, sort: { chartDate: -1, title: 1 } })

  return {
    ready: s1.ready(),
    latestCharts: Charts.find({},
      { limit: 2, sort: { chartDate: -1, title: 1 } }).fetch()
  }
})(ChartsList);
