import React, { Component } from 'react';

export default class Resend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitText: 'Resend email',
      submitEnabled: true,
      email: ''
    };
  }

  verified() {
    return Meteor.user() && Meteor.user().emails[0].verified;
  }

  handleKeyUp(event) {
    this.setState({ email: event.target.value });
  }

  handleSubmit(event) {
    var self = this;
    Meteor.call('resendVerificationLink', this.state.email,
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
        self.setState({ submitEnabled: false, submitText: newText });
      });
  }

  render() {
    return [<h2 className='general__header'>Resend Verification Email</h2>,
      <div className='resend__content'>
        {!verified && [
          <p>
            Lost your verification email? Type in your email address to send the
            verification email again. Be sure to check your spam folders and
            inbox.
          </p>,
          <div className="at-pwd-form">
            <form role="form" id="at-pwd-form" novalidate="" action="#"
              method="POST">
              <label for="at-field-email">Email</label>
              <input className="validate"
                type="email" id="at-field-email" name="at-field-email"
                autocapitalize="none" autocorrect="off"
                onKeyUp={this.handleKeyUp} />
              <button type="submit"
                className="at-btn submit waves-effect waves-light btn"
                id="at-btn" disabled={!this.state.submitEnabled}>
                {this.state.submitText}
              </button>
            </form>
          </div>] ||
        <p>
          Your email has been verified. You're good to go!
        </p>}
      </div>
    ];
  }
}
