import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Posts from '../../../api/posts/posts_collection.js';
import Profiles from '../../../api/users/profiles_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { Bert } from 'meteor/themeteorchef:bert';
import { withTracker } from 'meteor/react-meteor-data';
import { Metamorph } from 'react-metamorph';

class ProfilePage extends Component {
  static propTypes = {
    profile: PropTypes.object,
    show: PropTypes.object,
    posts: PropTypes.array
  }

  handleBan() {
    if (Meteor.user().hasRole('admin')) {
      var username = FlowRouter.getParam('username');
      var user = Meteor.users.findOne({ username: username });
      var profile = Profiles.findOne({ userId: user._id });
      Profiles.update(profile._id, { $set: { banned: true } });
      Bert.alert('User @' + username + ' banned.', 'default');
    }
  }

  handleUnban() {
    if (Meteor.user().hasRole('admin')) {
      var username = FlowRouter.getParam('username');
      var user = Meteor.users.findOne({ username: username });
      var profile = Profiles.findOne({ userId: user._id });
      Profiles.update(profile._id, { $set: { banned: false } });
      Bert.alert('User @' + username + '\'s ban lifted.', 'default');
    }
  }

  render() {
    if (this.props.profile !== undefined &&
      !this.props.profile.banned || Meteor.user() !== null &&
      Meteor.user().hasRole('admin')) {
      return [
        <Metamorph title={this.props.profile.name +
          '\'s Profile - KTUH FM Honolulu | Radio for the People'}
        description={this.props.profile.name + '\'s Profile'}
        image={this.props.profile.photo && this.props.profile.photo.url ||
          'https://ktuh.org/img/ktuh-logo.jpg'} />,
        <h2 className='general__header'>{this.props.profile.name}</h2>,
        <div className='profile'>
          {Meteor.userId() && this.props.profile.userId === Meteor.userId() && (
            <div>
              <a href='/profile'>
                <button type='button'
                  className='btn btn-default btn-md party-header__button'>
                  <span className='glyphicon glyphicon-edit'
                    aria-hidden='true'></span>
                  Edit
                </button>
              </a>
            </div>) || null}
          <div className='profile__left'>
            <img className='profile__pic'
              src={((this.props.profile.thumbnail || null) ||
              (this.props.profile.photo &&
              this.props.profile.photo.url || null)) ||
              ((!this.props.profile.thumbnail && !this.props.profile.photo) &&
              'https://ktuh.org/img/ktuh-logo.jpg' ||
              null)} />
            {(this.props.profile.website || this.props.profile.twitter ||
              this.props.profile.facebook || this.props.profile.snapchat ||
              this.props.profile.soundcloud || this.props.profile.instagram) &&
              (<div className='profile__social-icons'>
                {this.props.profile.website &&
                  <a href={this.props.profile.website}>
                    <img className='profile__social-icon'
                      src='/img/website.png' /></a> || null}
                {this.props.profile.soundcloud &&
                  <a href=
                    {`http://soundcloud.com/${this.props.profile.soundcloud}`}>
                    <img className='profile__social-icon'
                      src='/img/soundcloud.png' /></a> || null}
                {this.props.profile.instagram &&
                  <a href=
                    {`http://instagram.com/${this.props.profile.instagram}`}>
                    <img className='profile__social-icon'
                      src='/img/instagram.png' /></a> || null}
                {this.props.profile.facebook &&
                <a href={`http://facebook.com/${this.props.profile.facebook}`}>
                  <img className='profile__social-icon'
                    src='/img/facebook.png' /></a> || null}
                {this.props.profile.twitter &&
                  <a href={`http://twitter.com/${this.props.profile.twitter}`}>
                    <img className='profile__social-icon'
                      src='/img/twitter.png' /></a> || null}
                {this.props.profile.snapchat &&   <a href=
                  {`https://www.snapchat.com/add/${this.props.
                    profile.snapchat}`}>
                  <img className='profile__social-icon'
                    src='/img/snapchat.png' /></a> || null}
              </div>) || null}
            {!!this.props.show &&
              <div className='profile__show-link'>
                <a className='color-button white-button profile__show-button'
                  href={`/shows/${this.props.show.slug}`}>View Show Page</a>
              </div> || null}
          </div>
          <div className='profile__info'>
            <div className='profile__bio'
              dangerouslySetInnerHTML={{ __html: this.props.profile.bio ||
              `<i>(${this.props.
                profile.name} hasn't filled out a bio yet.)</i>` }} />
            {this.props.posts && this.props.posts.length > 0 &&
            <div className='profile__posts'>
              <h4>Posts</h4>
              {this.props.posts.map((post) =>
                <p key={post._id} className='profile__posts'>
                  <a href={`/radioblog/${post.slug}`}>{post.title}</a>
                </p>)}
            </div> || null}
            {((Meteor.userId() &&
              this.props.profile.userId === Meteor.userId()) ||
              (Meteor.user() && Meteor.user().hasRole('admin')) &&
              this.props.profile.userId === Meteor.userId()) &&
              (!this.props.profile.banned &&
              <input id='profile__ban-user' type="button" value="Ban User" /> ||
              <input id='profile__unban-user' type="button"
                value="Lift User Ban" />) || null}
          </div>
        </div>
      ];
    }
    else {
      return <p>This user does not have a profile.</p>;
    }
  }
}

export default withTracker(() => {
  var username = FlowRouter.getParam('username')

  Meteor.subscribe('userData', username, {
    onReady: function() {
      var user = Meteor.users.findOne({ username: username });
      if (user !== undefined) {
        Meteor.subscribe('profileData', user._id);
        Meteor.subscribe('showByUserId', user._id);
        Meteor.subscribe('postsByUser', username);
      }
    }
  });

  return {
    profile: (function() {
      var username = FlowRouter.getParam('username');
      var user = Meteor.users.findOne({ username: username });
      var profile = user && Profiles.findOne({ userId: user._id });

      if (profile !== undefined) {
        return profile;
      } else return false;
    })(),
    posts: Posts.find({}, { sort: { submitted: -1 } }).fetch(),
    show: (function() {
      var user = Meteor.users.findOne({
        username: FlowRouter.getParam('username')
      });
      if (user) return Shows.findOne({ userId: user._id });
      else return false;
    })()
  };
})(ProfilePage);
