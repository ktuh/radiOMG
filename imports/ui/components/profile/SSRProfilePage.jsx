import React from 'react';
import { object, array } from 'prop-types';
import Posts from '../../../api/posts/posts_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { Metamorph } from 'react-metamorph';

function SSRProfilePage({ profile, show, posts }) {
  if (profile !== undefined && !profile.banned) {
    return [
      <Metamorph title={`${profile.name
      }'s Profile - KTUH FM Honolulu | Radio for the People`}
      description={`${profile.name}'s Profile`}
      image={profile.photo && profile.photo.url ||
        'https://ktuh.org/img/ktuh-logo.jpg'} />,
      <h2 className='general__header'>{profile.name}</h2>,
      <div className='profile'>
        <div className='profile__left'>
          {profile.photo && <img className='profile__pic'
            src={profile.thumbnail || profile.photo.url} /> || null}
          {(profile.website || profile.twitter || profile.facebook ||
            profile.snapchat || profile.soundcloud || profile.instagram) &&
            (<div className='profile__social-icons'>
              {profile.website && <a href={profile.website}>
                <img className='profile__social-icon'
                  src='/img/website.png' /></a> || null}
              {profile.soundcloud &&
                <a href={`http://soundcloud.com/${profile.soundcloud}`}>
                  <img className='profile__social-icon'
                    src='/img/soundcloud.png' /></a> || null}
              {profile.instagram && <a href=
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
              {profile.snapchat && <a href={`https://www.snapchat.com/add/${
                profile.snapchat}`}>
                <img className='profile__social-icon'
                  src='/img/snapchat.png' /></a> || null}
            </div>) || null}
          {!!show && <div className='profile__show-link'>
            <a className='color-button white-button profile__show-button'
              href={`/shows/${show.slug}`}>View Show Page</a>
          </div> || null}
        </div>
        <div className='profile__info'>
          <div className='profile__bio'
            dangerouslySetInnerHTML={{ __html: profile.bio ||
            `<i>(${
              profile.name} hasn't filled out a bio yet.)</i>` }} />
          {posts && posts.length > 0 &&
          <div className='profile__posts'>
            <h4>Posts</h4>
            {posts.map(({ _id, slug, title }) =>
              <p key={_id} className='profile__posts'>
                <a href={`/radioblog/${slug}`}>{title}</a></p>)}
          </div> || null}
        </div>
      </div>
    ];
  }
  else {
    return <p>This user does not have a profile.</p>;
  }
}

SSRProfilePage.propTypes = {
  profile: object,
  show: object,
  posts: array
}

export default (profile) => <SSRProfilePage profile={profile}
  posts={Posts.find({ userId: profile.userId })}
  show={Shows.findOne({ userId: profile.userId })}/>;
