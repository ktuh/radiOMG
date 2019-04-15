import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

export default class LoginErrorMessage extends Component {
  static propTypes = {
    errorMessage: PropTypes.string
  }

  render() {
    return <div
      style={{ backgroundColor: 'pink', color: 'red',
        border: 'thin red solid' }}>
      {this.props.errorMessage}
    </div>;
  }
}
