import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Comments from '../../../api/comments/comments_collection.js';
import CommentItem from '../comments/CommentItem.jsx';
import CommentSubmit from '../comments/CommentSubmit.jsx';
import Parties from '../../../api/parties/parties_collection.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Metamorph } from 'react-metamorph';
import { Bert } from 'meteor/themeteorchef:bert';
import { default as moment } from 'moment';

function PartyPage({ ready, party, comments }) {
  function time(t) {
    return moment(t).format('dddd, MMMM Do YYYY, h:mm a');
  }

  function upvoted(upvoters) {
    var { username } = Meteor.user();
    var a = upvoters || [];
    var i = a.indexOf(username);
    var r = '';

    if (i >= 0) {
      r = 'upvoted';
    }

    return r;
  }

  function handleClickStar() {
    let user = Meteor.userId();

    if (user === null) {
      Bert.alert('Please log in (or register) to upvote.', 'info');
    }
    else {
      Meteor.call('upvoteParty', Parties.findOne()._id);
    }
  }

  if (ready) {
    var { title, thumbnail, summary, flyerFront, thumbnailBack, flyerBack,
      location, upvoters, tags, startTime, description
    } =  party;

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
          {flyerBack && <img className='flyer-div__back'
            src={thumbnailBack || flyerBack.url} /> || null}
        </div>
        <div className='party-info'>
          <h4>{location}</h4>
          <h5>{time(startTime)}</h5>
          <div dangerouslySetInnerHTML=
            {{ __html: description }} />
          <p className='party__tag'>
            {tags.map((tag) => `#${tag} `)}
          </p>
          <div className='party-info__details'>
            <span onClick={handleClickStar} className=
              {`party-info__star glyphicon glyphicon-star ${
                upvoted(upvoters)}`}>
            </span>
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
            {comments.map((comment) =>
              <CommentItem comment={comment}/>)}
          </ul> || null}
        {Meteor.user() && <CommentSubmit />  ||
            <p className='comments__text'>
              <i>Please log in to leave a comment.</i>
            </p>}
      </div>]
  }
  else return null;
}

PartyPage.propTypes = {
  ready: PropTypes.bool,
  party: PropTypes.object,
  comments: PropTypes.array
}

export default withTracker(() => {
  var slug = FlowRouter.getParam('slug'),
    s0, s1 = Meteor.subscribe('singleParty', slug, {
      onReady: function () {
        var post = Parties.findOne({ slug, approved: true });
        if (post) s0 = Meteor.subscribe('comments', post._id);
      }
    });

  return {
    ready: s1.ready() && (s0 !== undefined && s0.ready() || true),
    party: Parties.findOne({ slug: FlowRouter.getParam('slug') }),
    comments: Comments.find().fetch()
  };
})(PartyPage);
