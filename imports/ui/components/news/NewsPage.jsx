import React, { Component } from 'react';
import Profiles from '../../../api/users/profiles_collection.js';
import Posts from '../../../api/posts/posts_collection.js';
import Comments from '../../../api/comments/comments_collection.js';
import CommentItem from '../comments/CommentItem.jsx';
import CommentSubmit from '../comments/CommentSubmit.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { displayNameById, dateFormat } from '../../../startup/lib/helpers.js';
import { _ } from 'underscore';
import { Helmet } from 'react-helmet';

class NewsPage extends Component {
  render() {
    var self = this;

    if (this.props.ready)
      return [
        <Helmet key="metadata">
          <title>{this.props.post.title +
            ' - KTUH FM Honolulu | Radio for the People'}</title>
          <meta property="og:title"
            content={this.props.post.title +
              ' - KTUH FM Honolulu | Radio for the People'} />
          <meta property="og:description" content={this.props.post.summary} />
          <meta property="og:image" content={this.props.post.thumbnail ||
            '/img/ktuh-logo.png' } />
          <meta name="twitter:title" content={this.props.post.title +
            ' - KTUH FM Honolulu | Radio for the People'} />
          <meta name="twitter:url" content="https://ktuh.org" />
          <meta name="twitter:description" content={this.props.post.summary} />
          <meta name="twitter:site" content="@ktuh_fm" />
          <meta name="twitter:image" content={
            this.props.post.thumbnail ||
            'https://ktuh.org/img/ktuh-logo.jpg'
          } />
          <meta name="twitter:creator" content="@ktuh_fm" />
          <meta property="description" content={this.props.post.summary} />
        </Helmet>,
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
            {Meteor.user() && <CommentSubmit /> ||
              <p className='comments__text'>
                <i>Please log in to leave a comment.</i>
              </p>}
          </div>
        </div>
      ];
    else return null;
  }
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
      s1 = Meteor.subscribe('profileData', post.userId);
    }
  });

  return {
    ready: handle.ready() && (s0 && s0.ready() || false) &&
      (s1 && s1.ready() || false),
    comments: Comments.find().fetch(),
    post: Posts.findOne({ slug: slug })
  };
})(NewsPage);
