import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'underscore';
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';
import CustomLoginButtons from './CustomLoginButtons.jsx';
import MediaElement from './MediaElement.js';
import NowPlaying from '../../../api/playlists/playlists_collection.js';
import { moment } from 'meteor/momentjs:moment';

function activePage() {
  // includes Spacebars.kw but that's OK because the route name ain't that.
  var routeNames = arguments;

  return _.include(routeNames, FlowRouter.getRouteName()) && 'active';
}

export default class Header extends Component {
  static propTypes = {
    loaded: PropTypes.bool
  }

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (player.getSrc() === 'http://stream.ktuh.org:8000/stream-mp3')
      $('.mejs__time-rail').append(
        '<span class="mejs__broadcast">Live Broadcast</span>');
    else $('.mejs__time-slider').css('visibility', 'visible');
  }

  componentDidMount() {
    var $searchInput = $('.nav__search input');
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
              <MediaElement id="audio-player" src={this.props.loaded} />
            </li>
            <CustomLoginButtons />
          </ul>
        </div>
      </nav>
    );
  }
}
