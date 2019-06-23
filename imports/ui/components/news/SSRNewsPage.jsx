import React from 'react';
import PropTypes from 'prop-types';
import Comments from '../../../api/comments/comments_collection.js';
import CommentItem from '../comments/CommentItem.jsx';
import { displayNameById, dateFormat } from '../../../startup/lib/helpers.js';
import { Metamorph } from 'react-metamorph';

function SSRNewsPage({ post, comments }) {
  return [
    <Metamorph title={`${post.title
    } - KTUH FM Honolulu | Radio for the People`}
    description={post.summary}
    image={post.thumbnail || 'https://ktuh.org/img/ktuh-logo.png'} />,
    <h1 key="header-title" className='general__header'>
      {post.title}</h1>,
    <div key="radioblog-back-link" className='show__link'>
      <a href='/radioblog' className='back-to'>← Back to Radioblog</a>
    </div>,
    <div className='news-item' key="name-submitted">
      <p className='news-item__author'>
        {post.author &&
          <b>Posted by <a href={`/profile/${post.author}`}>
            {displayNameById(post.userId) || post.author}</a>
          </b> || null}
        <br />
        {dateFormat(post.submitted, 'dddd, MMMM DD, YYYY')}
      </p>
      <img className='news-item__photo'
        src={post.thumbnail || (post.photo && post.photo.url) ||
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
      </div>
    </div>
  ]
}

SSRNewsPage.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.array
}

export default (post) =>
  <SSRNewsPage post={post} comments={Comments.find({ _id: post._id })} />;
