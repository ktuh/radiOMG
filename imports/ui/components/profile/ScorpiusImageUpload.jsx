import React, { useState, forwardRef } from 'react';
import { scorpius } from 'meteor/scorpiusjs:core';
import { Bert } from 'meteor/themeteorchef:bert';

function ScorpiusImageUpload({ value, onChange, label }, ref) {
  let [state, setState] = useState({
    value, ready: true
  });

  function setTrue(url) {
    setState({ ready: true, value: url });
    onChange(url);
  }

  function uploadHelper(files) {
    setState({ ready: false, value: state.value });
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
          setTrue(upload.url);
          comp.stop();
        }
      }
    });
  }

  function handleChange(event) {
    uploadHelper(event.target.files);
  }

  return (
    <div ref={ref}>
      <p>{label}</p>
      <div><img id="urlImage" src={state.value} /></div>
      <input type="file" onChange={(event) => handleChange(event)} />
      <input type="text" disabled={true} value={state.value} />
    </div>
  );
}

export default forwardRef(ScorpiusImageUpload);
