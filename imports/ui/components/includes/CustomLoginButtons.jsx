import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'underscore';

class CustomLoginButtons extends Component {
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
  }

  handleView(event) {
    FlowRouter.go('profilePage', { username: this.props.currentUser.username });
  }

  handleEdit(event) {
    FlowRouter.go('profileEdit');
  }

  trimmedElementValueById(id) {
    const element = document.getElementById(id);
    if (!element)
      return null;
    else
      return element.value.replace(/^\s*|\s*$/g, '');
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

    Meteor.loginWithPassword(loginSelector, password, (error, result) => {
      if (error) {
        console.log(error);
        self.setState({ errorMessage: error });
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
  };

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

  handleChangePwd(event) {
    this.changePassword();
  }

  handleChangePwdFlow(event) {
    event.preventDefault();
    this.setState({ change: !this.state.change });
  }

  render() {
    var self = this, handleCreateClick = this.handleCreateClick.bind(this),
      handleClick = this.handleClick.bind(this),
      handleView = this.handleView.bind(this),
      handleEdit = this.handleEdit.bind(this),
      logoutClick = this.logoutClick.bind(this),
      handleKeyPress = this.handleKeyPress.bind(this),
      handleChangePwd = this.handleChangePwd.bind(this),
      handleChangePwdFlow = this.handleChangePwdFlow.bind(this);

    return (
      <li id="login-dropdown-list" className='dropdown'>
        <a className="dropdown-toggle" data-toggle="dropdown">
          {(!!self.props.currentUser &&
            self.props.currentUser.username) ||
          (!self.props.currentUser && 'Sign in / Join') || null}
          <b className="caret"></b>
        </a>
        {((!!self.props.currentUser && (!this.state.change &&
          <div className="dropdown-menu">
            <button className="btn btn-default btn-block"
              id="login-buttons-view-profile" onClick={handleView}>
              View profile
            </button>
            <button className="btn btn-default btn-block"
              id="login-buttons-edit-profile" onClick={handleEdit}>
              Edit profile
            </button>
            <button className="btn btn-default btn-block"
              id="login-buttons-open-change-password"
              onClick={handleChangePwdFlow}>Change password</button>
            <button className="btn btn-block btn-primary" onClick={logoutClick}
              id="login-buttons-Cancel">Sign out</button>
          </div>
        || null) || (this.state.change &&
          <div className="dropdown-menu">
            <input id="login-old-password" type="password"
              placeholder="Old Password" className="form-control" />
            <input id="login-password" type="password"
              placeholder="New Password" className="form-control" />
            <input id="login-password-again" type="password"
              placeholder="New Password Again" className="form-control" />
            <button className="btn btn-default btn-block"
              id="login-buttons-open-change-password"
              onClick={handleChangePwd}>Change password</button>
            <button className="btn btn-block btn-primary"
              onClick={handleChangePwdFlow}
              id="login-buttons-logout">Sign out</button>
          </div>
        || null)) || null) ||
        (!self.props.currentUser && (self.state.signup && (
          <div className="dropdown-menu">
            <button className="login-button btn btn-block btn-Facebook">
              Sign in with Facebook
            </button>
            <button className="login-button btn btn-block btn-Google">
              Sign in with Google
            </button>
            <div className="or">
    		      <span className="hline">{'          '}</span>
    		      <span className="or-text">or</span>
    		      <span className="hline">{'          '}</span>
    	      </div>
            <input id="login-username" type="text" placeholder="Username"
              className="form-control" />
            <input id="login-email" type="email" placeholder="Email"
              className="form-control" />
            <input id="login-password" type="password" placeholder="Password"
              className="form-control" />
            <button className="btn btn-primary col-xs-12 col-sm-12"
              id="login-buttons-password" type="button" onClick={handleClick}>
      				Create
    		    </button>
            <button id="back-to-login-link" onClick={handleCreateClick}
              className="btn btn-default col-xs-12 col-sm-12">Cancel
            </button>
          </div>
        ) || null) ||
            (!self.state.signup &&
            (
              <div className="dropdown-menu">
                <button className="login-button btn btn-block btn-Facebook">
                  Sign in with Facebook
                </button>
                <button className="login-button btn btn-block btn-Google">
                  Sign in with Google
                </button>
                <div className="or">
                  <span className="hline">{'          '}</span>
                  <span className="or-text">or</span>
                  <span className="hline">{'          '}</span>
                </div>
                <input id="login-username-or-email" type="text"
                  placeholder="Username or Email" className="form-control" />
                <input id="login-password" type="password"
                  placeholder="Password" className="form-control"
                  onKeyPress={handleKeyPress}/>
                <button className="btn btn-primary col-xs-12 col-sm-12"
                  id="login-buttons-password" type="button"
                  onClick={handleClick}>
                  Sign in
                </button>
                <div id="login-other-options">
                  <a id="forgot-password-link" className="pull-left">
                    Forgot password?
                  </a>
                  <a id="signup-link" onClick={handleCreateClick}
                    className="pull-right">
                    Create account
                  </a>
                </div>
              </div>
            ) || null))}
      </li>
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(CustomLoginButtons);
