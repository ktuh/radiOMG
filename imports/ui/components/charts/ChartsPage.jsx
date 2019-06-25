import React from 'react';
import PropTypes from 'prop-types';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Charts from '../../../api/charts/charts_collection.js';
import ChartsSidebar from './ChartsSidebar.jsx';
import ChartTable from './ChartTable.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { default as momentUtil } from 'moment';
import moment from 'moment-timezone';
import { Metamorph } from 'react-metamorph';

function ChartsPage({ ready, chart }) {

  function dateFmt(date) {
    return momentUtil(moment(date, 'Pacific/Honolulu')).format('MMMM DD, YYYY');
  }

  if (ready) {
    let { title, chartDate, tracks } = chart, dateStr = dateFmt(chartDate);

    return [
      <Metamorph title={`${title} - ${dateStr
      } - KTUH FM Honolulu | Radio for the People`} description={
        `${title} - ${dateStr}`} image='https://ktuh.org/img/ktuh-logo.jpg' />,
      <h1 className='general__header' key='header-title'>
        {`${title} - ${dateStr}`}</h1>,
      <div className='chart__link' key='charts-link'>
        <a href='/charts' className='back-to'>← Back to Charts</a>
      </div>,
      <div className='playlist-list__latest' key='playlist-content'>
        {tracks.length && <ChartTable { ...{ tracks }} /> || null}
      </div>,
      <ChartsSidebar key="chart-sidebar" />
    ];
  }
  else return null;
}

ChartsPage.propTypes = {
  ready: PropTypes.bool,
  chart: PropTypes.object
}

export default withTracker(() => {
  var slug = FlowRouter.getParam('slug'),
    s1 = Meteor.subscribe('singleChart', slug);

  return {
    ready: s1.ready(),
    chart: Charts.findOne({ slug: slug })
  }
})(ChartsPage);
