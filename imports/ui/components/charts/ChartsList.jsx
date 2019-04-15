import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Charts from '../../../api/charts/charts_collection.js';
import ChartsSidebar from './ChartsSidebar.jsx';
import ChartTable from './ChartTable.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';
import { Metamorph } from 'react-metamorph';

class ChartsList extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    latestCharts: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.dateFmt = this.dateFmt.bind(this);
  }

  dateFmt(date) {
    return momentUtil(moment(date, 'Pacific/Honolulu')).format('MMMM DD, YYYY');
  }

  shouldComponentUpdate() {
    return !this.props.ready;
  }

  render() {
    var dateFmt = this.dateFmt;

    return [
      <Metamorph title="Charts - KTUH FM Honolulu | Radio for the People"
        description="KTUH Charts" image='https://ktuh.org/img/ktuh-logo.jpg' />,
      <h2 className='general__header' key='header-title'>Charts</h2>,
      <div className='playlist-list__latest' key='playlist-list-conent'>
        {this.props.latestCharts.map((chart) =>
          [
            <h3 className='playlist__show-name' key={chart._id}>
              <a href={'/charts/' + chart.slug}>
                {chart.title + ' - ' + dateFmt(chart.chartDate)}
              </a>
            </h3>,
            <ChartTable tracks={chart.tracks} key={chart._id + ' tracks'}/>
          ])}
      </div>,
      <ChartsSidebar key="chart-sidebar" />
    ];
  }
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
