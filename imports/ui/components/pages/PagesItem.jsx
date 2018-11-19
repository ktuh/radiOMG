import React, { Component } from 'react';
import Pages from '../../../api/pages/pages_collection.js';
import { withTracker } from 'meteor/react-meteor-data';

class PagesItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.ready)
    return [
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
    s1 = Meteor.subscribe('singlePage', slug);

  return {
    ready: s1.ready(),
    page: Pages.findOne({ slug: slug, isDraft: false })
  }
})(PagesItem);
