import React, { Component } from 'react';
import { getLocalTime } from '../../../startup/lib/helpers.js';

export default class Banner extends Component {
  within(start, end) {
    var now = getLocalTime().toDate();
    return start < now && now < end;
  }

  render() {
    if (this.within(this.props.startDatetime, this.props.endDatetime)) {
      return <div className={'banner ' + ['light', 'medium', 'dark'][severity]}
        dangerouslySetInnerHTML={{ __html: this.props.body }} />;
    }
    else return null;
  }
}
