import React, { useState } from 'react';
import { Metamorph } from 'react-metamorph';
import { Meteor } from 'meteor/meteor';

export default function Resend() {
  let [state, setState] = useState({
    submitText: 'Resend email',
    submitEnabled: true,
    email: ''
  });

  function verified() {
    return Meteor.user() && Meteor.user().emails[0].verified;
  }

  function handleKeyUp(event) {
    setState({ email: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    Meteor.call('resendVerificationLink', state.email,
      (error, result) => {
        var newText = '';
        switch(result) {
        case 1:
          newText = 'Wait 30 minutes and try again.';
          break;
        case 3:
          newText = 'No unverified user with specified email.';
          break;
        case undefined:
          newText = 'An unknown error has occurred.';
          break;
        default:
          newText = 'Email sent.';
        }
        setState({ submitEnabled: false,
          submitText: newText, email: state.email });
      });
  }

  return [<Metamorph title=
    'Resend Verification Email - KTUH FM Honolulu | Radio for the People'
  description="Resend Email" image='https://ktuh.org/img/ktuh-logo.jpg' />,
  <h2 className='general__header'>Resend Verification Email</h2>,
  <div className='resend__content' key="resend-content">
    {!verified() && [<p>
      Lost your verification email? Type in your email address to send the
      verification email again. Be sure to check your spam folders and
      inbox.
    </p>,
    <div className="at-pwd-form" key="pwd-form">
      <form role="form" id="at-pwd-form" noValidate=""
        onSubmit={handleSubmit}>
        <label htmlFor="at-field-email">Email</label>
        <input className="validate" type="email" id="at-field-email"
          name="at-field-email" autoCapitalize="none" autoCorrect="off"
          onKeyUp={handleKeyUp} />
        <button type="submit"
          className="at-btn submit waves-effect waves-light btn" id="at-btn"
          disabled={!state.submitEnabled}>
          {state.submitText}
        </button>
      </form>
    </div>] ||
    <p>
      {'Your email has been verified. You\'re good to go!'}
    </p>}
  </div>];
}
