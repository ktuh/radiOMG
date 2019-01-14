import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pages from '../../../api/pages/pages_collection.js';
import { Helmet } from 'react-helmet';

class SSRPagesItem extends Component {
  static propTypes = {
    page: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    return [
      <Helmet key="metadata">
        <title>{this.props.page.title + ' - KTUH FM Honolulu | ' +
          'Radio for the People'}</title>
        <meta property="og:title"
          content={this.props.page.title + ' - KTUH FM Honolulu | ' +
            'Radio for the People'} />
        <meta property="og:description" content={this.props.page.title} />
        <meta name="twitter:title" content={this.props.page.title +
          ' - KTUH FM Honolulu | Radio for the People'} />
        <meta name="twitter:url" content="https://ktuh.org" />
        <meta name="twitter:description" content={this.props.page.title +
          ' - KTUH FM Honolulu | Radio for the People'} />
        <meta name="twitter:site" content="@ktuh_fm" />
        <meta name="twitter:image" content={
          'https://ktuh.org/img/ktuh-logo.jpg'
        } />
        <meta name="twitter:creator" content="@ktuh_fm" />
        <meta property="description" content={this.props.page.title} />
      </Helmet>,
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
