import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { withTracker } from 'meteor/react-meteor-data';
import { $ } from 'meteor/jquery';
import LoginErrorMessage from './LoginErrorMessage.jsx';

class CustomLoginButtons extends Component {
  static propTypes = {
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      open: false,
      change: false,
      forgot: false,
      errorMessage: '',
      infoMessage: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleForgot = this.handleForgot.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.menuLoggedInChange = this.menuLoggedInChange.bind(this);
    this.menuLoggedInNoChange = this.menuLoggedInNoChange.bind(this);
    this.menuSignup = this.menuSignup.bind(this);
    this.menuNone = this.menuNone.bind(this);
    this.menuForgot = this.menuForgot.bind(this);
    this.handleChangePwdFlow = this.handleChangePwdFlow.bind(this);
    this.logout = this.logout.bind(this);
    this.logoutClick = this.logoutClick.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleView() {
    FlowRouter.go('profilePage', { username: this.props.currentUser.username });
  }

  handleEdit() {
    FlowRouter.go('profileEdit');
  }

  trimmedElementValueById(id) {
    const element = document.getElementById(id);
    if (!element) {
      return null;
    }
    else {
      return element.value.replace(/^\s*|\s*$/g, '');
    }
  }

  elementValueById(id) {
    const element = document.getElementById(id);
    if (!element)
      return null;
    else
      return element.value;
  }

  login() {
    var self = this;
    const username = this.trimmedElementValueById('login-username');
    const email = this.trimmedElementValueById('login-email');
    const usernameOrEmail =
      this.trimmedElementValueById('login-username-or-email');
    // notably not trimmed. a password could (?) start or end with a space
    const password = this.elementValueById('login-password');

    let loginSelector;
    if (username !== null) {
      if (username.length < 3)
        return;
      else
        loginSelector = { username: username };
    } else if (email !== null) {
      if (!email.includes('@'))
        return;
      else
        loginSelector = { email: email };
    } else if (usernameOrEmail !== null) {
      if (usernameOrEmail.length < 3)
        return;
      else
        loginSelector = usernameOrEmail;
    } else {
      throw new
      Error('Unexpected -- no element to use as a login user selector');
    }

    Meteor.loginWithPassword(loginSelector, password, (error) => {
      if (error) {
        $('#login-dropdown-list').addClass('open');
        $('#login-dropdown-list .dropdown-toggle').attr(
          'aria-expanded', 'true');
        self.setState({ errorMessage: error.reason });
      }
    });
  }

  logout() {
    Meteor.logout();
  }

  forgotPassword() {
    const email = this.trimmedElementValueById('forgot-password-email');
    if (email.includes('@')) {
      Accounts.forgotPassword({ email: email }, error => {
        if (error)
          this.state.set({ errorMessage: error.reason || 'Unknown error' });
        else
          this.state.set({ infoMessage: 'Email sent' });
      });
    } else {
      this.state.set({ errorMessage: 'Invalid email' });
    }
  }

  validateEmail(email) {
    return /[A-Za-z0-9._-]+@[A-Za-z0-9._-]/.test(email);
  }

  signup() {
    const options = {}; // to be passed to Accounts.createUser

    const username = this.trimmedElementValueById('login-username');
    if (username !== null) {
      if (username.length < 3)
        return;
      else
        options.username = username;
    }

    const email = this.trimmedElementValueById('login-email');
    if (email !== null) {
      if (!this.validateEmail(email))
        return;
      else
        options.email = email;
    }

    const password = this.elementValueById('login-password');
    if (password.length < 6)
      return;
    else
      options.password = password;

    Accounts.createUser(options, error => {
      if (error) {
        this.setState({ errorMessage: error.reason || 'Unknown error' });
      }
    });
  }

  loginOrSignup() {
    if (this.state.signup) {
      this.signup();
      this.setState({ infoMessage: 'Please verify email.' });
    }
    else {
      this.login();
    }
  }

  changePassword() {
    // notably not trimmed. a password could (?) start or end with a space
    const oldPassword = this.elementValueById('login-old-password');

    // notably not trimmed. a password could (?) start or end with a space
    const password = this.elementValueById('login-password');
    if (password.length < 6)
      return;

    if (this.elementValueById('login-password-again') !== password) {
      this.setState({ errorMessage: 'Passwords don\'t match' });
      return;
    }

    Accounts.changePassword(oldPassword, password, error => {
      if (error) {
        this.setState({ errorMessage: error.reason || 'Unknown error' });
      } else {
        this.setState({ infoMessage: 'Password changed' });
        document.getElementById('login-old-password').value = '';
        document.getElementById('login-password').value = '';
        document.getElementById('login-password-again').value = '';
      }
    });
  }

  handleClick(event) {
    event.preventDefault();
    this.loginOrSignup();
  }

  handleCreateClick(event) {
    event.preventDefault();
    $('#login-dropdown-list').addClass('open');
    $('#login-dropdown-list .dropdown-toggle').attr(
      'aria-expanded', 'true');
    this.setState({ signup: !this.state.signup });
  }

  logoutClick(event) {
    event.preventDefault();
    this.logout();
  }

  handleKeyPress(event) {
    if (event.charCode === 13 && event.target.value !== '') {
      if (!this.state.signup) this.login();
    }
  }

  handleChangePwd() {
    this.changePassword();
  }

  handleChangePwdFlow(event) {
    event.preventDefault();
    this.setState({ change: !this.state.change });
  }

  handleForgot(event) {
    event.preventDefault();
    this.setState({ forgot: !this.state.forgot });
  }

  menuLoggedInChange() {
    return [
      <input id="login-old-password" type="password"
        placeholder="Old Password" className="form-control" />,
      <input id="login-password" type="password"
        placeholder="New Password" className="form-control" />,
      <input id="login-password-again" type="password"
        placeholder="New Password Again" className="form-control" />,
      <button className="btn btn-default btn-block"
        id="login-buttons-open-change-password"
        onClick={this.handleChangePwd}>Change password</button>,
      <button className="btn btn-block btn-primary"
        onClick={this.handleChangePwdFlow}
        id="login-buttons-logout">Sign out</button>
    ];
  }

  menuLoggedInNoChange() {
    return [
      <button className="btn btn-default btn-block"
        id="login-buttons-view-profile" onClick={this.handleView}>
        View profile
      </button>,
      <button className="btn btn-default btn-block"
        id="login-buttons-edit-profile" onClick={this.handleEdit}>
        Edit profile
      </button>,
      <button className="btn btn-default btn-block"
        id="login-buttons-open-change-password"
        onClick={this.handleChangePwdFlow}>Change password</button>,
      <button className="btn btn-block btn-primary"
        onClick={this.logoutClick}
        id="login-buttons-Cancel">Sign out</button>];
  }

  menuNone() {
    return [
      <button className="login-button btn btn-block btn-Facebook">
        Sign in with Facebook
      </button>,
      <button className="login-button btn btn-block btn-Google">
        Sign in with Google
      </button>,
      <div className="or">
        <span className="hline">{'          '}</span>
        <span className="or-text">or</span>
        <span className="hline">{'          '}</span>
      </div>,
      <input id="login-username-or-email" type="text"
        placeholder="Username or Email" className="form-control" />,
      <input id="login-password" type="password"
        placeholder="Password" className="form-control"
        onKeyPress={this.handleKeyPress}/>,
      <button className="btn btn-primary col-xs-12 col-sm-12"
        id="login-buttons-password" type="button"
        onClick={this.handleClick}>
        Sign in
      </button>,
      <div id="login-other-options">
        <a id="forgot-password-link" className="pull-left"
          onClick={this.handleForgot}>
          Forgot password?
        </a>
        <a id="signup-link" onClick={this.handleCreateClick}
          className="pull-right">
          Create account
        </a>
      </div>];
  }

  menuSignup() {
    return [
      <button className="login-button btn btn-block btn-Facebook">
        Sign in with Facebook
      </button>,
      <button className="login-button btn btn-block btn-Google">
        Sign in with Google
      </button>,
      <div className="or">
        <span className="hline">{'          '}</span>
        <span className="or-text">or</span>
        <span className="hline">{'          '}</span>
      </div>,
      <input id="login-username" type="text" placeholder="Username"
        className="form-control" />,
      <input id="login-email" type="email" placeholder="Email"
        className="form-control" />,
      <input id="login-password" type="password" placeholder="Password"
        className="form-control" />,
      <button className="btn btn-primary col-xs-12 col-sm-12"
        id="login-buttons-password" type="button"
        onClick={this.handleClick}>
        Create
      </button>,
      <button id="back-to-login-link"
        onClick={this.handleCreateClick}
        className="btn btn-default col-xs-12 col-sm-12">Cancel
      </button>];
  }

  menuForgot() {
    return [<input id="forgot-password-email" type="email" placeholder="Email"
      className="form-control" />, <button className=
      "btn btn-primary col-xs-12 col-sm-12" id="login-buttons-password" type=
      "button" onClick={this.forgotPassword}>
        Confirm
    </button>, <button id="back-to-login-link" onClick=
      {this.handleForgot} className=
      "btn btn-default col-xs-12 col-sm-12">Cancel</button>];
  }

  render() {
    return (
      <li id="login-dropdown-list" className='dropdown'>
        <a className="dropdown-toggle" data-toggle="dropdown">
          {(this.props.currentUser ? this.props.currentUser.username :
            'Sign in / Join')}
          <b className="caret"></b>
        </a>
        <div className="dropdown-menu">
          {this.state.errorMessage ?
            <LoginErrorMessage errorMessage={this.state.errorMessage} />
            : null}
          {this.props.currentUser ?
            (this.state.change ? this.menuLoggedInChange() :
              this.menuLoggedInNoChange()) :
            (this.state.signup ? this.menuSignup() :
              (this.state.forgot ? this.menuForgot() : this.menuNone()))}
        </div>
      </li>
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(CustomLoginButtons);
