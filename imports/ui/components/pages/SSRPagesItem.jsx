import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pages from '../../../api/pages/pages_collection.js';
import { Metamorph } from 'react-metamorph';

class SSRPagesItem extends Component {
  static propTypes = {
    page: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    return [
      <Metamorph title={this.props.page.title + ' - KTUH FM Honolulu | ' +
        'Radio for the People'} image='https://ktuh.org/img/ktuh-logo.jpg'
      description={this.props.page.title +
          ' - KTUH FM Honolulu | Radio for the People'} />,
      <h2 className='general__header' key='header-title'>
        {this.props.page.title}</h2>,
      <div className="page__content" key='page-content'
        dangerouslySetInnerHTML={{ __html: this.props.page.body }}
      />
    ];
  }
}

export default (slug) =>
  <SSRPagesItem page={Pages.findOne({ slug: slug })} />;
