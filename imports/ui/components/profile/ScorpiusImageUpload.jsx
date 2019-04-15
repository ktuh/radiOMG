import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scorpius } from 'meteor/scorpiusjs:core';
import { Bert } from 'meteor/themeteorchef:bert';

export default class ScorpiusImageUpload extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      ready: true
    };
    this.uploadHelper = this.uploadHelper.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setTrue = this.setTrue.bind(this);
  }

  shouldComponentUpdate() {
    return true;
  }

  setTrue(url) {
    this.setState({ ready: true, value: url });
    this.props.onChange(url);
  }

  uploadHelper(files) {
    this.setState({ ready: false });
    var set = this.setTrue;
    if (scorpius.filesystem.isUploading()) return;
    var upload = scorpius.filesystem.upload({
      fileList: files,
      name: files[0].name,
      uploader: 'image-attribute'
    });
    Tracker.autorun(function(comp) {
      if (upload.ready()) {
        if (upload.error) {
          Bert.alert('There was an error uploading the image.');
        }
        if (upload.progress() === 100) {
          set(upload.url);
          comp.stop();
        }
      }
    });
  }

  handleChange(event) {
    this.uploadHelper(event.target.files);
  }

  render() {
    return (
      <div>
        <p>{this.props.label}</p>
        <div><img id="urlImage" src={this.state.value} /></div>
        <input type="file" onChange={(event) => this.handleChange(event)} />
        <input type="text" disabled={true} value={this.state.value} />
      </div>
    );
  }
}
