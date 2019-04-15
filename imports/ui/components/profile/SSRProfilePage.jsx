import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Posts from '../../../api/posts/posts_collection.js';
import Shows from '../../../api/shows/shows_collection.js';
import { Metamorph } from 'react-metamorph';

class SSRProfilePage extends Component {
  static propTypes = {
    profile: PropTypes.object,
    show: PropTypes.object,
    posts: PropTypes.array
  }

  render() {
    if (this.props.profile !== undefined && !this.props.profile.banned) {
      return [
        <Metamorph title={this.props.profile.name +
          '\'s Profile - KTUH FM Honolulu | Radio for the People'}
        description={this.props.profile.name + '\'s Profile'}
        image={this.props.profile.photo && this.props.profile.photo.url ||
          'https://ktuh.org/img/ktuh-logo.jpg'} />,
        <h2 className='general__header'>{this.props.profile.name}</h2>,
        <div className='profile'>
          <div className='profile__left'>
            {this.props.profile.photo && <img className='profile__pic'
              src={this.props.profile.thumbnail ||
              this.props.profile.photo.url} /> || null}
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
          </div>
        </div>
      ];
    }
    else {
      return <p>This user does not have a profile.</p>;
    }
  }
}

export default (profile) => <SSRProfilePage profile={profile}
  posts={Posts.find({ userId: profile.userId })}
  show={Shows.findOne({ userId: profile.userId })}/>;
