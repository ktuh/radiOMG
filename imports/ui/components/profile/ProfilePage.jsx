import React from 'react';
import { object, array } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Posts from '../../../api/posts/posts_collection.js';
import Profiles from '../../../api/users/profiles_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { Bert } from 'meteor/themeteorchef:bert';
import { withTracker } from 'meteor/react-meteor-data';
import { Metamorph } from 'react-metamorph';

function ProfilePage({
  profile, show, posts
}) {
  function handleBan() {
    if (Meteor.user().hasRole('admin')) {
      var username = FlowRouter.getParam('username');
      var user = Meteor.users.findOne({ username: username });
      var profile = Profiles.findOne({ userId: user._id });
      Profiles.update(profile._id, { $set: { banned: true } });
      Bert.alert(`User @${username} banned.`, 'default');
    }
  }

  function handleUnban() {
    if (Meteor.user().hasRole('admin')) {
      var username = FlowRouter.getParam('username');
      var user = Meteor.users.findOne({ username: username });
      var profile = Profiles.findOne({ userId: user._id });
      Profiles.update(profile._id, { $set: { banned: false } });
      Bert.alert(`User @${username}'s ban lifted.`, 'default');
    }
  }

  if (profile !== undefined && !profile.banned || Meteor.user() !== null &&
    Meteor.user().hasRole('admin')) {
    return [
      <Metamorph title={`${profile.name
      }'s Profile - KTUH FM Honolulu | Radio for the People`}
      description={`${profile.name}'s Profile`}
      image={profile.photo && profile.photo.url ||
        'https://ktuh.org/img/ktuh-logo.jpg'} />,
      <h2 className='general__header'>{profile.name}</h2>,
      <div className='profile'>
        {Meteor.userId() && profile.userId === Meteor.userId() && (
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
            src={((profile.thumbnail || null) ||
            (profile.photo && profile.photo.url || null)) ||
            ((!profile.thumbnail && !profile.photo) &&
            'https://ktuh.org/img/ktuh-logo.jpg' ||
            null)} />
          {(profile.website || profile.twitter || profile.facebook ||
            profile.snapchat || profile.soundcloud || profile.instagram) &&
            (<div className='profile__social-icons'>
              {profile.website &&
                <a href={profile.website}>
                  <img className='profile__social-icon'
                    src='/img/website.png' /></a> || null}
              {profile.soundcloud &&
                <a href=
                  {`http://soundcloud.com/${profile.soundcloud}`}>
                  <img className='profile__social-icon'
                    src='/img/soundcloud.png' /></a> || null}
              {profile.instagram &&
                <a href=
                  {`http://instagram.com/${profile.instagram}`}>
                  <img className='profile__social-icon'
                    src='/img/instagram.png' /></a> || null}
              {profile.facebook &&
              <a href={`http://facebook.com/${profile.facebook}`}>
                <img className='profile__social-icon'
                  src='/img/facebook.png' /></a> || null}
              {profile.twitter &&
                <a href={`http://twitter.com/${profile.twitter}`}>
                  <img className='profile__social-icon'
                    src='/img/twitter.png' /></a> || null}
              {profile.snapchat &&   <a href=
                {`https://www.snapchat.com/add/${profile.snapchat}`}>
                <img className='profile__social-icon'
                  src='/img/snapchat.png' /></a> || null}
            </div>) || null}
          {!!show &&
            <div className='profile__show-link'>
              <a className='color-button white-button profile__show-button'
                href={`/shows/${show.slug}`}>View Show Page</a>
            </div> || null}
        </div>
        <div className='profile__info'>
          <div className='profile__bio'
            dangerouslySetInnerHTML={{ __html: profile.bio ||
            `<i>(${profile.name} hasn't filled out a bio yet.)</i>` }} />
          {posts && posts.length &&
          <div className='profile__posts'>
            <h4>Posts</h4>
            {posts.map((post) =>
              <p key={post._id} className='profile__posts'>
                <a href={`/radioblog/${post.slug}`}>{post.title}</a>
              </p>)}
          </div> || null}
          {((Meteor.userId() && profile.userId === Meteor.userId()) ||
            (Meteor.user() && Meteor.user().hasRole('admin')) &&
            profile.userId === Meteor.userId()) &&
            (!profile.banned &&
            <input id='profile__ban-user' type="button" value="Ban User"
              onClick={handleBan} /> ||
            <input id='profile__unban-user' type="button"
              value="Lift User Ban" onClick={handleUnban} />) || null}
        </div>
      </div>
    ];
  }
  else {
    return <p>This user does not have a profile.</p>;
  }
}

ProfilePage.propTypes = {
  profile: object,
  show: object,
  posts: array
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
