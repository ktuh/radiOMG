import React, { Component } from 'react';

export default class GeneralHeader extends Component {
  render() {
    if (!!this.props.big)
      return <h1 className="general__header">{this.props.children}</h1>
    else
      return <h2 className="general__header">{this.props.children}</h2>
  }
}
