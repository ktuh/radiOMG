import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'underscore';
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';
import CustomLoginButtons from './CustomLoginButtons.jsx';
import 'mediaelement';

function activePage() {
  // includes Spacebars.kw but that's OK because the route name ain't that.
  var routeNames = arguments;

  return _.include(routeNames, FlowRouter.getRouteName()) && 'active';
}

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var $searchInput = $('.nav__search input');
    var mp3 = $('#audio-player').attr('src');

    Session.set('nowLoaded', mp3);
    Session.set('nowPlaying', 'Live audio stream.');
    $searchInput.css('font-family', 'Glyphicons Halflings');
    $searchInput.attr('placeholder', '\ue003');
    $searchInput.focusin(function () {
      if (FlowRouter.getRouteName() != 'mix')
        FlowRouter.go('mix');
      $searchInput.css('font-family', 'Sweden Sans');
      $searchInput.attr('placeholder', 'Search DJ, genre, etc.');
      $('.tags').removeClass('hidden');
    });
    $searchInput.focusout(function() {
      if ($searchInput.val().length === 0) {
        $searchInput.css('font-family', 'Glyphicons Halflings');
        $searchInput.attr('placeholder', '\ue003');
      }
      if (!Session.get('mouseIsOverTag')) {
        $('.tags').addClass('hidden');
      }
    });

    $('#audio-player').mediaelementplayer({
      pluginPath: '/mejs/',
      alwaysShowControls: true,
      features: ['playpause', 'progress'],
      type: 'audio/mp3',
      src: 'http://stream.ktuh.org:8000/stream-mp3',
      audioWidth: 200,
      audioHeight: 20,
      iPadUseNativeControls: false,
      iPhoneUseNativeControls: false,
      AndroidUseNativeControls: false,
      success: function (mediaElement, domObject) {
        mediaElement.addEventListener('play', function(e) {
          Session.set('paused', false);
        }, false);
        mediaElement.addEventListener('pause', function(e) {
          Session.set('paused', true);
        }, false);

        $('.mejs__time-rail').append(
          '<span class="mejs__broadcast">Live Broadcast</span>');

        $('.mejs__time-slider').css('visibility', 'hidden');
        // Display what's playing if user clicks the player without loading
        // another song first.
        $('.mejs__playpause-button').click(function () {
          if (Session.equals('defaultLoaded', true)) {
            var message = 'Now playing the ' +
              scorpius.dictionary.get('mainPage.title', 'station\'s') +
              ' live stream';
            Session.set('defaultLoaded', false);
            Session.set('nowLoaded',
              scorpius.dictionary.get('mainPage.audioUrl', ''));
            if (!Session.get('playedStream')) {
              Bert.alert(message, 'default', 'growl-top-right', 'fa-music');
              Session.set('playedStream', true);
            }
          }
        });
        global.player = mediaElement; // make it available for other functions
      },
      error: function () {
        console.error('Error initializing the media element.');
      }
    });

    if (NowPlaying.findOne()) {
      Session.set('timeout',
        moment().diff(moment(NowPlaying.findOne().timestamp)) > 360000);
    }

    setInterval(function() {
      if (NowPlaying.findOne()) {
        if (moment().diff(moment(NowPlaying.findOne().timestamp)) > 360000 &&
            !Session.get('timeout')) {
          Session.set('timeout', true);
        }
        else {
          if (Session.get('timeout')) {
            Session.set('timeout', false);
          }
        }
      }
    }, 60000);

    if ($('#resend-link')[0] === undefined)
      $('#login-other-options').append(
        '<a href="/resend" id="resend-link" class="pull-right">Resend ' +
        'Verification Email</a>');
  }

  render() {
    return (
      <nav className='navbar navbar-default' role='navigation'>
        <div className='info-box'>
          <a className='info-box__link' href='/'>
            <img alt='KTUH FM' src='/img/ktuh-fm-logo.png' />
          </a>
        </div>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed'
            data-toggle='collapse' data-target='#navigation'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
        </div>
        <div className='collapse navbar-collapse' id='navigation'>
          <ul className='nav navbar-nav navbar-left'>
            <li className=
              {`dropdown ${activePage('about', 'timeline', 'join', 'faq',
                'contact-us', 'staff', 'alumni', 'underwriting')}`}>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'
                role='button' aria-haspopup='true' aria-expanded='false'>
                  About Us <span className='caret'></span>
              </a>
              <ul className='dropdown-menu'>
                <li className='header__submenu-support'>
                  <a href={'https://www.uhfoundation.org/give/giving-gift.aspx'+
                    '?school_code=ktuh'}>
                    <button className='btn btn-md'>Donate Now</button>
                  </a>
                </li>
                <li><a href='/about-us'>KTUH History</a></li>
                <li><a href='/timeline'>KTUH Timeline</a></li>
                <li><a href='/staff'>KTUH Staff</a></li>
                <li><a href='/alumni'>KTUH Alumni</a></li>
                <li><a href=
                  {'https://www.uhfoundation.org/give/giving-gift.aspx' +
                    '?school_code=ktuh'}>Donate</a>
                </li>
                <li><a href='/join-ktuh'>Join KTUH</a></li>
                <li><a href='/contact-us'>Contact Us</a></li>
                <li><a href='/faq'>FAQ</a></li>
                <li><a href='/underwriting'>Underwriting</a></li>
              </ul>
            </li>
            <li className={`dropdown ${activePage('show', 'showPage',
              'showCreate', 'showEdit', 'playlistPage', 'playlistList',
              'reviewsPage', 'chartList', 'chartPage')}`}>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'
                role='button' aria-haspopup='true' aria-expanded='false'>
                Music <span className='caret'></span>
              </a>
              <ul className='dropdown-menu'>
                <li><a href='/shows'>Show Schedule</a></li>
                <li><a href='/playlists'>Playlists</a></li>
                <li><a href='/reviews'>Reviews</a></li>
                <li><a href='/charts'>Charts</a></li>
              </ul>
            </li>
            <li className={`${activePage('party', 'partyPage', 'partyCreate',
              'partyEdit')}' nav-item nav-item__parties`}>
              <a href={FlowRouter.path('party')}>Events</a>
            </li>
            <li className={activePage('radioblog', 'blogPage') +
              ' nav-item nav-item__news'}>
              <a href={FlowRouter.path('radioblog')}>Radioblog</a><
            /li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li className='nav-item'>
              <a className='header__support-link'
                href={'https://www.uhfoundation.org/give/giving-gift.aspx' +
                  '?school_code=ktuh'}>
                <button type='button'
                  className='btn btn-md header__support-btn'>
                  <span>DONATE</span>
                </button>
              </a>
            </li>
          </ul>
          <ul className='nav navbar-nav'>
            <li className='nav-item'>
              <div className='audio-player'>
                <audio id='audio-player' preload='none' controls>
                  <source src='http://stream.ktuh.org:8000/stream-mp3'
                    type='audio/mp3' />
                </audio>
              </div>
            </li>
            <CustomLoginButtons />
          </ul>
        </div>
      </nav>
    );
  }
}
