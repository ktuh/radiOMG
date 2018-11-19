import React, { Component } from 'react';
import Charts from '../../../api/charts/charts_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { moment as momentUtil } from 'meteor/momentjs:moment';
import moment from 'moment-timezone';
import { pages } from '../../../startup/lib/helpers.js';
import CustomPaginator from '../reusables/CustomPaginator.jsx';

class ChartsSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  handleClick(page) {
    this.setState({ currentPage: page });
  }

  handlePreviousClick() {
    this.setState({ currentPage: this.state.currentPage - 1 });
  }

  handleNextClick() {
    this.setState({ currentPage: this.state.currentPage + 1 });
  }

  dateFmt(date) {
    return momentUtil(moment(date, 'Pacific/Honolulu')).format('MMMM DD, YYYY');
  }

  render() {
    var handleClick = this.handleClick.bind(this),
      handlePreviousClick = this.handlePreviousClick.bind(this),
      handleNextClick = this.handleNextClick.bind(this);

    if (this.props.ready) {
      return (<div className='playlist__sidebar'>
        <h6>More Charts</h6>
        <table className="playlist-list__table" border="1">
          <tbody>
            {(this.props.pages)[this.state.currentPage - 1].map((chart) => {
              return (
                <tr key={chart._id}><td><a href={'/charts/' + chart.slug}>
                  <p className='home__title'>
                    {chart.title + ' - ' + this.dateFmt(chart.chartDate)}
                  </p>
                </a></td></tr>
              );
            })}
          </tbody>
        </table>
        <div className='news-list__paginator'>
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
    pages: pages(Charts.find({}, { sort:
      { chartDate: -1, title: 1 }
    }).fetch(), 8)
  };
})(ChartsSidebar);
