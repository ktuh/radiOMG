import React, { Component } from 'react';
import { throwError } from '../../../../client/helpers/errors.js';

export default class CommentSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentSubmitErrors: {}
    }
  }

  errorMessage(field) {
    return this.state.commentSubmitErrors[field];
  }

  errorClass(field) {
    if (this.state.commentSubmitErrors[field]) return 'has-error';
    else return '';
  }

  handleSubmit(event) {
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
    };

    var comment = {
      body: $body.val(),
      postId: postId,
      type: FlowRouter.getRouteName()
    };
    var errors = {};
    if (! comment.body) {
      errors.body = 'Please write something.';
      return this.setState({ commentSubmitErrors: errors });
    }
    Meteor.call('commentInsert', comment, function(error, commentId) {
      if (error){
        throwError(error.reason, { type: 'danger' });
      } else {
        $body.val('');
      }
    });
  }

  render() {
    var handleSubmit = this.handleSubmit.bind(this);

    return (
      <form name='comment' className='comment-form form'>
        <div className={'form-group ' + this.errorClass('body')}>
          <div className='controls'>
            <label htmlFor='body' className='comment__controls-label'>
              Comment on this post
            </label>
            <textarea name='body' id='body' className='form-control' rows='3'>
            </textarea>
            <span className='help-block'>{this.errorMessage('body')}</span>
          </div>
        </div>
        <button type='submit' className='btn btn-primary'
          onClick={handleSubmit}>
          Add Comment
        </button>
      </form>
    );
  }
}
