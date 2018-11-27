import React, { Component } from 'react';
import { $ } from 'meteor/jquery';
import 'mediaelement';
import { Session } from 'meteor/session';

export default class MediaElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  success(mediaElement, node, instance) {
    $('.mejs__time-rail').append(
      '<span class="mejs__broadcast">Live Broadcast</span>');

    $('.mejs__time-slider').css('visibility', 'hidden');

    $('.mejs__playpause-button').click(function () {
      if (Session.equals('defaultLoaded', true)) {
        var message = 'Now playing the ' +
          scorpius.dictionary.get('mainPage.title', 'station\'s') +
          ' live stream';
        Session.set('defaultLoaded', false);

        if (!Session.get('playedStream')) {
          Bert.alert(message, 'default', 'growl-top-right', 'fa-music');
          Session.set('playedStream', true);
        }
      }
    });
    global.player = mediaElement;
  }

  error(media) {
    console.error('Error initializing the media element.');
  }

  render() {
    const props = this.props;
    const mediaBody = `<source src="${props.src}" type="audio/mp3">`,
      mediaHtml = `<audio id="${props.id}" width="${props.width}" controls>
        ${mediaBody}
      </audio>`;

    return (<div className="audio-player"
      dangerouslySetInnerHTML={{ __html: mediaHtml }}></div>);
  }

  componentDidMount() {
    const { MediaElementPlayer } = global;

    if (!MediaElementPlayer) {
      return;
    }

    const options = Object.assign({}, this.props.options, {
    // Read the Notes below for more explanation about how to set up the path for shims
      pluginPath: '/mejs/',
      success: (media, node, instance) => this.success(media, node, instance),
      error: (media, node) => this.error(media, node)
    });

    this.setState({ player: new MediaElementPlayer(this.props.id, options) });

    $('.mejs__time-rail').append(
      '<span class="mejs__broadcast">Live Broadcast</span>');
  }
}
