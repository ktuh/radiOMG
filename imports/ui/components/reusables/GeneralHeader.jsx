import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GeneralHeader extends Component {
  static propTypes = {
    children: PropTypes.any,
    big: PropTypes.bool
  }

  static defaultProps = {
    big: false
  }

  render() {
    if (this.props.big) {
      return <h1 className="general__header">{this.props.children}</h1>;
    }
    else {
      return <h2 className="general__header">{this.props.children}</h2>;
    }
  }
}
