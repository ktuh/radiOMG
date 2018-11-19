import React, { Component } from 'react';
import Pages from '../../../api/pages/pages_collection.js';

class PagesItem extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.stop();
  }

  render() {
    return [
      <h2 className='general__header' key='header-title'>
        {this.props.page.title}</h2>,
      <div className="page__content" key='page-content'
        dangerouslySetInnerHTML={{ __html: this.props.page.body }}
      />
    ];
  }
}

export default withTracker(() => {
  var slug = FlowRouter.getParam('slug'),
    s1 = Meteor.subscribe('singlePage', slug);

  return {
    stop: function() {
      s1.stop();
    },
    ready: s1.ready(),
    page: Pages.findOne({ slug: slug, isDraft: false })
  }
})(PagesItem);
