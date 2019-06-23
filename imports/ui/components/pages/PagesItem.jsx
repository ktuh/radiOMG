import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Pages from '../../../api/pages/pages_collection.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Metamorph } from 'react-metamorph';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

function PagesItem({ ready, page }) {
  if (ready)
    return [<Metamorph title={`${
      page.title} - KTUH FM Honolulu | Radio for the People`}
    image='https://ktuh.org/img/ktuh-logo.jpg' description={`${
      page.title} - KTUH FM Honolulu | Radio for the People`} />,
    <h2 className='general__header' key='header-title'>
      {page.title}</h2>,
    <div className="page__content" key='page-content'
      dangerouslySetInnerHTML={{ __html: page.body }}
    />];
  else return null;
}

PagesItem.propTypes = {
  ready: PropTypes.bool,
  page: PropTypes.object
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
