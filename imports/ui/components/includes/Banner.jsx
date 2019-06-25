import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { getLocalTime } from '../../../startup/lib/helpers.js';
import Notices from '../../../api/notices/notices_collection.js';
import { withTracker } from 'meteor/react-meteor-data';

function Banner({ ready, notice }) {
  function within(start, end) {
    var now = getLocalTime().toDate();
    return start < now && now < end;
  }

  if (ready && notice && within(notice.startDatetime, notice.endDatetime)) {
    return <div className='banner-container'>
      <div className={`banner ${
        ['light', 'medium', 'dark'][notice.severity]}`}
      dangerouslySetInnerHTML={{ __html: notice.body }} /></div>;
  }
  else return null;
}

Banner.propTypes = {
  ready: PropTypes.bool,
  notice: PropTypes.object
}

export default withTracker(() => {
  var s1 = Meteor.subscribe('notices');

  return {
    ready: s1.ready(),
    notice: Notices.findOne({})
  };
})(Banner);
