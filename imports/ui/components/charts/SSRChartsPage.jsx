import React from 'react';
import PropTypes from 'prop-types';
import ChartTable from './ChartTable.jsx';
import { default as momentUtil } from 'moment';
import moment from 'moment-timezone';
import { Metamorph } from 'react-metamorph';

function SSRChartsPage({ chart: {
  chartDate, title, tracks
} }) {

  function dateFmt(date) {
    return momentUtil(moment(date, 'Pacific/Honolulu')).format('MMMM DD, YYYY');
  }

  let dateStr = dateFmt(chartDate);

  return [
    <Metamorph title={`${title} - ${dateStr
    } - KTUH FM Honolulu | Radio for the People`}
    description={`${title} - ${dateStr}`}
    image='https://ktuh.org/img/ktuh-logo.jpg' />,
    <h1 className='general__header' key='header-title'>
      {`${title} - ${dateStr}`}</h1>,
    <div className='chart__link' key='charts-link'>
      <a href='/charts' className='back-to'>← Back to Charts</a>
    </div>,
    <div className='playlist-list__latest' key='playlist-content'>
      {tracks.length &&
        <ChartTable tracks={tracks} /> || null}
    </div>
  ];
}

SSRChartsPage.propTypes = {
  chart: PropTypes.object
}

export default (chart) => <SSRChartsPage chart={chart} />;
