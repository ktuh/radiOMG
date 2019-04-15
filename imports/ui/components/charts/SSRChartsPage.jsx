import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChartTable from './ChartTable.jsx';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';
import { Metamorph } from 'react-metamorph';

class SSRChartsPage extends Component {
  static propTypes = {
    chart: PropTypes.object
  }

  dateFmt(date) {
    return momentUtil(moment(date, 'Pacific/Honolulu')).format('MMMM DD, YYYY');
  }

  render() {
    var dateFmt = this.dateFmt;
    return [
      <Metamorph title={this.props.chart.title + ' - ' +
        dateFmt(this.props.chart.chartDate) + ' - ' +
        'KTUH FM Honolulu | Radio for the People'} description={
        this.props.chart.title + ' - ' + dateFmt(this.props.chart.chartDate)
      } image='https://ktuh.org/img/ktuh-logo.jpg' />,
      <h1 className='general__header' key='header-title'>
        {this.props.chart.title + ' - ' +
          dateFmt(this.props.chart.chartDate)}</h1>,
      <div className='chart__link' key='charts-link'>
        <a href='/charts' className='back-to'>← Back to Charts</a>
      </div>,
      <div className='playlist-list__latest' key='playlist-content'>
        {this.props.chart.tracks.length > 0 &&
          <ChartTable tracks={this.props.chart.tracks} /> || null}
      </div>
    ];
  }
}

export default (chart) => <SSRChartsPage chart={chart} />;
