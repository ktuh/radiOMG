import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comments from '../../../api/comments/comments_collection.js';
import CommentItem from '../comments/CommentItem.jsx';
import { displayNameById, dateFormat } from '../../../startup/lib/helpers.js';
import { Metamorph } from 'react-metamorph';

class SSRNewsPage extends Component {
  static propTypes = {
    post: PropTypes.object,
    comments: PropTypes.array
  }

  render() {
    return [
      <Metamorph title={this.props.post.title +
        ' - KTUH FM Honolulu | Radio for the People'}
      description={this.props.post.summary}
      image={this.props.post.thumbnail ||
          'https://ktuh.org/img/ktuh-logo.png'} />,
      <h1 key="header-title" className='general__header'>
        {this.props.post.title}</h1>,
      <div key="radioblog-back-link" className='show__link'>
        <a href='/radioblog' className='back-to'>← Back to Radioblog</a>
      </div>,
      <div className='news-item' key="name-submitted">
        <p className='news-item__author'>
          {this.props.post.author &&
            <b>Posted by <a href={`/profile/${this.props.post.author}`}>
              {displayNameById(this.props.post.userId) ||
                this.props.post.author}</a>
            </b> || null}
          <br />
          {dateFormat(this.props.post.submitted, 'dddd, MMMM DD, YYYY')}
        </p>
        <img className='news-item__photo'
          src={this.props.post.thumbnail ||
          (this.props.post.photo && this.props.post.photo.url) ||
          '/mstile-310x310.png'} />
        <div className='news-item__body'
          dangerouslySetInnerHTML={{ __html: this.props.post.body }} />
        <div className='comments'>
          <h3 className='comments__header'>Comments</h3>
          {this.props.comments.length > 0 &&
            <ul className='comments__list'>
              {this.props.comments.map((comment) =>
                <CommentItem key={comment._id} comment={comment}/>)}
            </ul> || null}
        </div>
      </div>
    ]
  }
}

export default (post) =>
  <SSRNewsPage post={post} comments={Comments.find({ _id: post._id })} />;
