import React, { Component } from 'react';
import Comments from '../../../api/comments/comments_collection.js';
import CommentItem from '../comments/CommentItem.jsx';
import Parties from '../../../api/parties/parties_collection.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Helmet } from 'react-helmet';

class SSRPartyPage extends Component {
  time(t) {
    return moment(t).format('dddd, MMMM Do YYYY, h:mm a');
  }

  render() {
    return [
      <Helmet key="metadata">
        <title>{this.props.party.title +
          ' - KTUH FM Honolulu | Radio for the People'}</title>
        <meta property="og:title"
          content={this.props.party.title +
            ' - KTUH FM Honolulu | Radio for the People'} />
        <meta property="og:description" content={this.props.party.summary} />
        <meta property="og:image" content={this.props.party.thumbnail ||
          '/img/ktuh-logo.png' } />
        <meta name="twitter:title" content={this.props.party.title +
          ' - KTUH FM Honolulu | Radio for the People'} />
        <meta name="twitter:url" content="https://ktuh.org" />
        <meta name="twitter:description"
          content={this.props.party.description} />
        <meta name="twitter:site" content="@ktuh_fm" />
        <meta name="twitter:image" content={
          this.props.party.thumbnail ||
          'https://ktuh.org/img/ktuh-logo.jpg'
        } />
        <meta name="twitter:creator" content="@ktuh_fm" />
        <meta property="description" content={this.props.party.description} />
      </Helmet>,
      <h1 className='general__header'>{this.props.party.title}</h1>,
      <div className='event__link'>
        <a href='/events' className='back-to'>← all events</a>
      </div>,
      <div className='event-item'>
        <div className='flyer-div'>
          <img className='flyer-div__front'
            src={this.props.party.thumbnail ||
              this.props.party.flyerFront.url} />
          {this.props.party.flyerBack &&
            <img className='flyer-div__back'
              src={this.props.party.thumbnailBack ||
              this.props.party.flyerBack.url} /> || null}
        </div>
        <div className='party-info'>
          <h4>{this.props.party.location}</h4>
          <h5>{this.time(this.props.party.startTime)}</h5>
          <div dangerouslySetInnerHTML=
            {{ __html: this.props.party.description }} />
          <p className='party__tag'>
            {this.props.party.tags.map((tag) => `#${tag} `)}
          </p>
          <div className='party-info__details'>
            <span className='party-info__upvotes-count'>
              {this.props.party.upvoters.length}
            </span>
          </div>
        </div>
      </div>,
      <div className='comments news-item'>
        <h3 className='comments__header'>Comments</h3>
        {this.props.comments.length > 0 &&
          <ul className='comments__list'>
            {this.props.comments.map((comment) =>
              <CommentItem comment={comment}/>)}
          </ul> || null}
      </div>
    ];
  }
}

export default (party) => <SSRPartyPage party={party}
  comments={Comments.find({ postId: party._id })} />;
