import React from 'react';
import { any, bool } from 'prop-types';

export default function GeneralHeader() {
  if (this.props.big) {
    return <h1 className="general__header">{this.props.children}</h1>;
  }
  else {
    return <h2 className="general__header">{this.props.children}</h2>;
  }
}

GeneralHeader.propTypes = {
  children: any,
  big: bool
}

GeneralHeader.defaultProps = {
  big: false
}
