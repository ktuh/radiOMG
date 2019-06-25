import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Charts from '../../../api/charts/charts_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { default as momentUtil } from 'moment';
import moment from 'moment-timezone';
import { pages } from '../../../startup/lib/helpers.js';
import EverAfter from 'react-everafter';

function ChartsSidebar({ ready, charts }) {
  function dateFmt(date) {
    return momentUtil(moment(date, 'Pacific/Honolulu')).format('MMMM DD, YYYY');
  }

  if (ready) {
    return (
      <div className='playlist__sidebar'>
        <h6>More Charts</h6>
        <EverAfter.TablePaginator className="playlist-list__table"
          perPage={8} items={charts}
          truncate={true} columns={[{
            headerText: '',
            display:
            ({ slug, title, chartDate }) => <a href={`/charts/${slug}`}>
              <p className='home__title'>
                {`${title} - ${dateFmt(chartDate)}`}
              </p>
            </a>
          }]} />
      </div>);
  }
  else return null;
}

ChartsSidebar.propTypes = {
  ready: PropTypes.bool,
  charts: PropTypes.array
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
