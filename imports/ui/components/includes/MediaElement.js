import React, { useState, useEffect } from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { string, object } from 'prop-types';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';
import 'mediaelement';
import { scorpius } from 'meteor/scorpiusjs:core';

export default function MediaElement({ options, id, src }) {
  let [, setState] = useState({ });

  function success(mediaElement) {
    $('.mejs__time-rail').append(
      '<span class="mejs__broadcast">Live Broadcast</span>');

    $('.mejs__time-slider').css('visibility', 'hidden');

    $('.mejs__playpause-button').click(function () {
      if (Session.equals('defaultLoaded', true)) {
        var message = `Now playing the ${
          scorpius.dictionary.get('mainPage.title', 'station\'s')} live stream`;
        Session.set('defaultLoaded', false);

        if (!Session.get('playedStream')) {
          Bert.alert(message, 'default', 'growl-top-right', 'fa-music');
          Session.set('playedStream', true);
        }
      }
    });
    global.player = mediaElement;
  }

  function error() {
    console.error('Error initializing the media element.');
  }

  useEffect(function() {
    const { MediaElementPlayer } = global;

    if (!MediaElementPlayer) {
      return;
    }

    const newOptions = Object.assign({}, options, {
      // Read the Notes below for more explanation
      // about how to set up the path for shims
      pluginPath: '/mejs/',
      alwaysShowControls: true,
      features: ['playpause', 'progress'],
      iPadUseNativeControls: false,
      iPhoneUseNativeControls: false,
      AndroidUseNativeControls: false,
      success, error
    });

    setState({ player: new MediaElementPlayer(id, newOptions) });

    $('.mejs__time-rail').append(
      '<span class="mejs__broadcast">Live Broadcast</span>');
  }, []);

  const mediaBody = `<source src="${src}" type="audio/mp3">`,
    mediaHtml = `<audio id="${id}" controls>${mediaBody}</audio>`;

  return (<div className="audio-player"
    dangerouslySetInnerHTML={{ __html: mediaHtml }}></div>);
}

MediaElement.propTypes = {
  options: object,
  id: string,
  src: string
}
