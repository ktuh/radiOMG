import React from 'react';
import PropTypes from 'prop-types';
import Pages from '../../../api/pages/pages_collection.js';
import { Metamorph } from 'react-metamorph';

function SSRPagesItem({ page: { title, body } }) {
  return [
    <Metamorph title={`${title
    } - KTUH FM Honolulu | Radio for the People`}
    image='https://ktuh.org/img/ktuh-logo.jpg'
    description={`${title} - KTUH FM Honolulu | Radio for the People`} />,
    <h2 className='general__header' key='header-title'>
      {title}</h2>,
    <div className="page__content" key='page-content'
      dangerouslySetInnerHTML={{ __html: body }}
    />
  ];
}

SSRPagesItem.propTypes = {
  page: PropTypes.object
}

export default (slug) =>
  <SSRPagesItem page={Pages.findOne({ slug })} />;
