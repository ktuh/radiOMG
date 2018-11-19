import React, { Component } from 'react';

export default class CustomPaginator extends Component {
  handlePreviousClick(e) {
    this.props.handlePreviousClick();
  }

  handleNextClick() {
    this.props.handleNextClick();
  }

  handleClick(page) {
    this.props.handleClick(page);
  }

  isActive(page) {
    if (this.props.currentPage === page) return ' active';
    return '';
  }

  render() {
    var handlePreviousClick = this.handlePreviousClick.bind(this),
      handleNextClick = this.handleNextClick.bind(this),
      handleClick = this.handleClick.bind(this), self = this,
      isActive = this.isActive.bind(this);

    return (
      <ul className="custom__paginator">
        {this.props.currentPage > 1 &&
          <li className="custom__paginator-btn"
            onClick={handlePreviousClick}>
            <a>{'<'}</a></li>|| null}
        {this.props.pages.map(function(page, i) {
          return (
            <li key={i} onClick={(e) => { handleClick(i + 1); }}
              className={'custom__paginator-btn' + isActive(i + 1)}>
              <a>{i + 1}</a>
            </li>);
        })}
        {this.props.currentPage < this.props.pages.length &&
          <li className="custom__paginator-btn"
            onClick={handleNextClick}><a>{'>'}</a></li> || null}
      </ul>
    );
  }
}
