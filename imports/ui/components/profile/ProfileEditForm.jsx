import React, { useState, createRef, useEffect } from 'react';
import { object } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Text from 'simple-react-form-material-ui/lib/text';
import ScorpiusImageUpload from './ScorpiusImageUpload.jsx';
import SummernoteTextEdit from './SummernoteTextEdit.jsx';
import ObjectComponent from 'simple-react-form-material-ui/lib/object';
import { Form, Field } from 'simple-react-form';
import Profiles from '../../../api/users/profiles_collection.js';
import { $ } from 'meteor/jquery';
import 'meteor/summernote:standalone';

export default function ProfileEditForm({ doc }) {
  let [state, setState] = useState(doc), formRef = createRef();

  useEffect(function() {
    $('#summernote').summernote();
    $('.note-editable.panel-body').html(state.bio);
  }, []);

  function updateCollection(data) {
    if ($('.note-editable.panel-body').html() !== '') {
      data.bio = $('.note-editable.panel-body').html();
    }

    Profiles.update({ _id: doc._id }, { $set: data });
  }

  function handleChange(changes) {
    var newState = Object.assign({}, state);
    for (var change in changes) {
      newState[change] = changes[change];
    }
    setState(newState);
  }

  return (
    <Form collection={Profiles} doc={doc} onChange={handleChange}
      onSubmit={(data) => {
        updateCollection(data);
        FlowRouter.go(`/profile/${Meteor.user().username}`);
      }} ref={formRef} type="update">
      <h4 className="profile-edit__label">Display Name</h4>
      <Field fieldName='name' label="Display Name" type={Text}
        value={state.name} />

      <h4 className="profile-edit__label">Profile Photo</h4>
      <Field fieldName='photo' type={ObjectComponent}>
        <Field fieldName='url' type={ScorpiusImageUpload} />
      </Field>

      <h4 className="profile-edit__label">Bio</h4>
      <Field fieldName='bio' label="Bio" type={SummernoteTextEdit} />

      <h4 className="profile-edit__label">Website</h4>
      <Field fieldName='website' label="Website" type={Text}
        value={state.website} />

      <h4 className="profile-edit__label">SoundCloud Handle</h4>
      <Field fieldName='soundcloud' label="SoundCloud Handle" type={Text}
        value={state.soundcloud} />

      <h4 className="profile-edit__label">Instagram Handle</h4>
      <Field fieldName='instagram' label="Instagram Handle" type={Text}
        value={state.instagram} />

      <h4 className="profile-edit__label">Facebook Handle</h4>
      <Field fieldName='facebook' label="Facebook Handle" type={Text}
        value={state.facebook} />

      <h4 className="profile-edit__label">Twitter Handle</h4>
      <Field fieldName='twitter' label="Twitter Handle" type={Text}
        value={state.twitter} />

      <h4 className="profile-edit__label">Snapchat Handle</h4>
      <Field fieldName='snapchat' label="Snapchat Handle" type={Text}
        value={state.snapchat} />

      <button type="submit" className="btn btn-primary">Submit</button>
    </Form>
  );
}

ProfileEditForm.propTypes = {
  doc: object
}
