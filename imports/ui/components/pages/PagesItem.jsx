import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Pages from '../../../api/pages/pages_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Metamorph } from 'react-metamorph';
import { FlowRouter } from 'meteor/kadira:flow-router';

class PagesItem extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    page: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.ready)
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
    else return null;
  }
}

export default withTracker(() => {
  var slug = FlowRouter.getParam('slug'),
    s1 = Meteor.subscribe('singlePage', slug, {
      onStop: function() {
        FlowRouter.go('/not-found');
      }
    });

  return {
    ready: s1.ready(),
    page: Pages.findOne({ slug: slug, isDraft: false })
  }
})(PagesItem);
