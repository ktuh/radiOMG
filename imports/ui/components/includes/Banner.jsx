import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { getLocalTime } from '../../../startup/lib/helpers.js';
import Notices from '../../../api/notices/notices_collection.js';
import { withTracker } from 'meteor/react-meteor-data';

class Banner extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    notice: PropTypes.object
  }

  within(start, end) {
    var now = getLocalTime().toDate();
    return start < now && now < end;
  }

  render() {
    if (this.props.ready && this.props.notice &&
      this.within(this.props.notice.startDatetime,
        this.props.notice.endDatetime)) {
      return <div className='banner-container'><div className={'banner ' +
          ['light', 'medium', 'dark'][this.props.notice.severity]}
      dangerouslySetInnerHTML={{ __html: this.props.notice.body }} /></div>;
    }
    else return null;
  }
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('notices');

  return {
    ready: s1.ready(),
    notice: Notices.findOne({})
  };
})(Banner);
