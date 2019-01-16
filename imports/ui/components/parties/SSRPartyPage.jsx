import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comments from '../../../api/comments/comments_collection.js';
import CommentItem from '../comments/CommentItem.jsx';
import { Metamorph } from 'react-metamorph';
import { moment } from 'meteor/momentjs:moment';

class SSRPartyPage extends Component {
  static propTypes = {
    party: PropTypes.object,
    comments: PropTypes.array
  }

  time(t) {
    return moment(t).format('dddd, MMMM Do YYYY, h:mm a');
  }

  render() {
    return [
      <Metamorph title={this.props.party.title +
        ' - KTUH FM Honolulu | Radio for the People'}
      image={this.props.party.thumbnail ||
        'https://ktuh.org/img/ktuh-logo.png'}
      description={this.props.party.summary} />,
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
