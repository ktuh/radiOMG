import React from 'react';
import PropTypes from 'prop-types';
import Posts from '../../../api/posts/posts_collection.js';
import Comments from '../../../api/comments/comments_collection.js';
import CommentItem from '../comments/CommentItem.jsx';
import CommentSubmit from '../comments/CommentSubmit.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { displayNameById, dateFormat } from '../../../startup/lib/helpers.js';
import { Metamorph } from 'react-metamorph';
import { Meteor } from 'meteor/meteor';

function NewsPage({ ready, post, comments }) {
  if (ready)
    return [<Metamorph title={`${post.title
    } - KTUH FM Honolulu | Radio for the People`} description={post.summary}
    image={post.thumbnail ||
        'https://ktuh.org/img/ktuh-logo.png'} />,
    <h1 key="header-title" className='general__header'>
      {post.title}</h1>,
    <div key="radioblog-back-link" className='show__link'>
      <a href='/radioblog' className='back-to'>← Back to Radioblog</a>
    </div>,
    <div className='news-item' key="name-submitted">
      <p className='news-item__author'>
        {post.author &&
          <b>Posted by {post.userId ?
            <a href={`/profile/${post.author}`}>
              {displayNameById(post.userId) ||
              post.author}</a> : post.author}
          </b> || null}
        <br />
        {dateFormat(post.submitted, 'dddd, MMMM DD, YYYY')}
      </p>
      <img className='news-item__photo'
        src={post.thumbnail ||
        (post.photo && post.photo.url) ||
        '/mstile-310x310.png'} />
      <div className='news-item__body'
        dangerouslySetInnerHTML={{ __html: post.body }} />
      <div className='comments'>
        <h3 className='comments__header'>Comments</h3>
        {comments.length > 0 &&
          <ul className='comments__list'>
            {comments.map((comment) =>
              <CommentItem key={comment._id} comment={comment}/>)}
          </ul> || null}
        {Meteor.user() && <CommentSubmit /> ||
          <p className='comments__text'>
            <i>Please log in to leave a comment.</i>
          </p>}
      </div>
    </div>];
  else return null;
}

NewsPage.propTypes = {
  ready: PropTypes.bool,
  post: PropTypes.object,
  comments: PropTypes.array
}

export default withTracker(() => {
  var slug = FlowRouter.getParam('slug');
  var s0, s1, handle = Meteor.subscribe('singlePost', slug, {
    onReady: function() {
      var post = Posts.findOne({ slug: slug, approved: true });
      if (!post) {
        FlowRouter.go('/radioblog');
        return;
      }
      s0 = Meteor.subscribe('comments', post._id);
      if (post.userId) s1 = Meteor.subscribe('profileData', post.userId);
    }
  });

  return {
    ready: handle.ready() && (s0 && s0.ready() || false) &&
      (s1 && s1.ready() || s1 === undefined),
    comments: Comments.find().fetch(),
    post: Posts.findOne({ slug: slug })
  };
})(NewsPage);
