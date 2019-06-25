import React from 'react';
import PropTypes from 'prop-types';
import Comments from '../../../api/comments/comments_collection.js';
import CommentItem from '../comments/CommentItem.jsx';
import { Metamorph } from 'react-metamorph';
import { default as moment } from 'moment';

function SSRPartyPage({ party, comments }) {
  function time(t) {
    return moment(t).format('dddd, MMMM Do YYYY, h:mm a');
  }

  var { title, thumbnail, summary, flyerBack, flyerFront, thumbnailBack,
    location, startTime, description, tags, upvoters } = party;

  return [
    <Metamorph title={`${title} - KTUH FM Honolulu | Radio for the People`}
      image={thumbnail || 'https://ktuh.org/img/ktuh-logo.png'}
      description={summary} />,
    <h1 className='general__header'>{title}</h1>,
    <div className='event__link'>
      <a href='/events' className='back-to'>← all events</a>
    </div>,
    <div className='event-item'>
      <div className='flyer-div'>
        <img className='flyer-div__front' src={thumbnail || flyerFront.url} />
        {flyerBack &&
          <img className='flyer-div__back'
            src={thumbnailBack || flyerBack.url} /> || null}
      </div>
      <div className='party-info'>
        <h4>{location}</h4>
        <h5>{time(startTime)}</h5>
        <div dangerouslySetInnerHTML=
          {{ __html: description }} />
        <p className='party__tag'>{tags.map((tag) => `#${tag} `)}</p>
        <div className='party-info__details'>
          <span className='party-info__upvotes-count'>
            {upvoters.length}
          </span>
        </div>
      </div>
    </div>,
    <div className='comments news-item'>
      <h3 className='comments__header'>Comments</h3>
      {comments.length &&
        <ul className='comments__list'>
          {comments.map(comment => (<CommentItem comment={comment}/>))}
        </ul> || null}
    </div>
  ];
}

SSRPartyPage.propTypes = {
  party: PropTypes.object,
  comments: PropTypes.array
}

export default (party) => <SSRPartyPage party={party}
  comments={Comments.find({ postId: party._id })} />;
