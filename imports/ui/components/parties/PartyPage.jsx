import React, { Component } from 'react';
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
import { moment } from 'meteor/momentjs:moment';

class PartyPage extends Component {
  static propTypes = {
    ready: PropTypes.bool,
    party: PropTypes.object,
    comments: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.handleClickStar = this.handleClickStar.bind(this);
  }

  time(t) {
    return moment(t).format('dddd, MMMM Do YYYY, h:mm a');
  }
  upvoted(upvoters) {
    var username = Meteor.user().username;
    var a = upvoters || [];
    var i = a.indexOf(username);
    var r = '';

    if (i >= 0) {
      r = 'upvoted';
    }

    return r;
  }

  handleClickStar() {
    let user = Meteor.userId();

    if (user === null) {
      Bert.alert('Please log in (or register) to upvote.', 'info');
    }
    else {
      Meteor.call('upvoteParty', Parties.findOne()._id);
    }
  }

  render() {
    if (this.props.ready) {
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
              <span onClick={this.handleClickStar} className=
                {'party-info__star glyphicon glyphicon-star ' +
                  this.upvoted(this.props.party.upvoters)}>
              </span>
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
          {Meteor.user() && <CommentSubmit />  ||
              <p className='comments__text'>
                <i>Please log in to leave a comment.</i>
              </p>}
        </div>]
    }
    else return null;
  }
}

export default withTracker(() => {
  var slug = FlowRouter.getParam('slug'),
    s0, s1 = Meteor.subscribe('singleParty', slug, {
      onReady: function () {
        var post = Parties.findOne({ slug: slug, approved: true });
        if (post) s0 = Meteor.subscribe('comments', post._id);
      }
    });

  return {
    ready: s1.ready() && (s0 !== undefined && s0.ready() || true),
    party: Parties.findOne({ slug: FlowRouter.getParam('slug') }),
    comments: Comments.find().fetch()
  };
})(PartyPage);
