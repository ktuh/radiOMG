import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Charts from '../../../api/charts/charts_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';
import { pages } from '../../../startup/lib/helpers.js';
import EverAfter from 'react-everafter';

class ChartsSidebar extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    charts: PropTypes.array
  }

  constructor(props) {
    super(props);
  }

  dateFmt(date) {
    return momentUtil(moment(date, 'Pacific/Honolulu')).format('MMMM DD, YYYY');
  }

  render() {
    var dateFmt = this.dateFmt;

    if (this.props.ready) {
      return (
        <div className='playlist__sidebar'>
          <h6>More Charts</h6>
          <EverAfter.TablePaginator className="playlist-list__table"
            perPage={8} items={this.props.charts}
            truncate={true} columns={[{
              headerText: '',
              display: (item) => <a href={'/charts/' + item.slug}>
                <p className='home__title'>
                  {item.title + ' - ' + dateFmt(item.chartDate)}
                </p>
              </a>
            }]} />
        </div>);
    }
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('charts');

  return {
    ready: s1.ready(),
    pages: pages(Charts.find({}, { sort:
      { chartDate: -1, title: 1 }
    }).fetch(), 8),
    charts: Charts.find({}, { sort: { chartDate: -1, title: 1 } }).fetch()
  };
})(ChartsSidebar);
