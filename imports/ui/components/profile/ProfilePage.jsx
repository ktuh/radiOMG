import React, { useEffect } from 'react';
import { object, array } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Posts from '../../../api/posts/posts_collection.js';
import Profiles from '../../../api/users/profiles_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { Bert } from 'meteor/themeteorchef:bert';
import { withTracker } from 'meteor/react-meteor-data';
import { Metamorph } from 'react-metamorph';

function ProfileSocialLink(url, handle, icon) {
  if (handle) return <a href={`${url}${handle}`}>
    <img className='profile__social-icon' src={`/img/${icon}.png`} /></a>
  else return null;
}

function ProfilePage({
  profile, show, posts
}) {
  function toggleBan() {
    if (Meteor.user().hasRole('admin')) {
      let username = FlowRouter.getParam('username'),
        user = Meteor.users.findOne({ username }),
        profile = Profiles.findOne({ userId: user._id });
      Profiles.update(profile._id, { $set: { banned: !profile.banned } });
      Bert.alert(
        `User @${username} ${profile.banned ? 'un' : ''}banned.`, 'default');
    }
  }

  useEffect(() => {}, [Meteor.user() && Meteor.user().hasRole('admin')]);

  if (profile !== undefined && !profile.banned || Meteor.user() !== null &&
    Meteor.user().hasRole('admin')) {
    let { name, photo, userId, thumbnail, website, twitter, facebook,
      snapchat, instagram, soundcloud } = profile;
    return [<Metamorph title={`${name
    }'s Profile - KTUH FM Honolulu | Radio for the People`}
    description={`${name}'s Profile`} image={photo && photo.url ||
      'https://ktuh.org/img/ktuh-logo.jpg'} />,
    <h2 className='general__header'>{name}</h2>,
    <div className='profile'>
      {Meteor.userId() && userId === Meteor.userId() && (
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
          src={((thumbnail || null) ||
          (photo && photo.url || null)) ||
          ((!thumbnail && !photo) && 'https://ktuh.org/img/ktuh-logo.jpg' ||
          null)} />
        {(website || twitter || facebook || snapchat || soundcloud || instagram)
          && (<div className='profile__social-icons'>
            {[
              ['', website, 'website'],
              ['http://soundcloud.com/', soundcloud, 'soundcloud'],
              ['http://instagram.com/', instagram, 'instagram'],
              ['http://facebook.com/', facebook, 'facebook'],
              ['http://twitter.com/', twitter, 'twitter'],
              ['http://snapchat.com/add/', snapchat, 'snapchat']
            ].map((params) => ProfileSocialLink(...params))}
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
        {(Meteor.user() && Meteor.user().hasRole('admin') &&
          profile.userId !== Meteor.userId()) && (!profile.banned &&
          <input id='profile__ban-user' type="button" value="Ban User"
            onClick={toggleBan} /> ||
          <input id='profile__unban-user' type="button"
            value="Lift User Ban" onClick={toggleBan} />) || null}
      </div>
    </div>];
  }
  else {
    return <p>This user does not have a profile.</p>;
  }
}

ProfilePage.propTypes = {
  profile: object,
  show: object,
  posts: array
};

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
      var username = FlowRouter.getParam('username'),
        user = Meteor.users.findOne({ username }),
        profile = user && Profiles.findOne({ userId: user._id });

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
