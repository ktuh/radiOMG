import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Parties from '../../../api/parties/parties_collection.js';
import Playlists from '../../../api/playlists/playlists_collection.js';
import Posts from '../../../api/posts/posts_collection.js';
import { throwError } from '../../../../client/helpers/errors.js';
import { $ } from 'meteor/jquery';

export default function CommentSubmit(){
  let [state, setState] = useState({
    commentSubmitErrors: ''
  })

  function errorMessage(field) {
    return state.commentSubmitErrors[field];
  }

  function errorClass(field) {
    if (state.commentSubmitErrors[field]) return 'has-error';
    else return '';
  }

  function handleSubmit(event) {
    event.preventDefault();

    var $body = $(event.target).find('[name=body]');
    var postId = null;

    // not an ideal solution; i'm just having trouble w/ parent Template data.
    switch(FlowRouter.getRouteName()) {
    case 'partyPage':
      postId = Parties.findOne()._id;
      break;
    case 'playlistPage':
      postId = Playlists.findOne()._id;
      break;
    case 'newsPage':
      postId = Posts.findOne()._id;
      break;
    default:
      throwError('Cannot comment on this page!');
      return;
    }

    var comment = {
      body: $body.val(),
      postId: postId,
      type: FlowRouter.getRouteName()
    };
    var errors = {};
    if (! comment.body) {
      errors.body = 'Please write something.';
      return setState({ commentSubmitErrors: errors });
    }
    Meteor.call('commentInsert', comment, function(error) {
      if (error){
        throwError(error.reason, { type: 'danger' });
      } else {
        $body.val('');
      }
    });
  }

  return <form name='comment' className='comment-form form'>
    <div className={`form-group ${errorClass('body')}`}>
      <div className='controls'>
        <label htmlFor='body' className='comment__controls-label'>
          Comment on this post
        </label>
        <textarea name='body' id='body' className='form-control' rows='3'>
        </textarea>
        <span className='help-block'>{errorMessage('body')}</span>
      </div>
    </div>
    <button type='submit' className='btn btn-primary' onClick={handleSubmit}>
      Add Comment
    </button>
  </form>;
}
