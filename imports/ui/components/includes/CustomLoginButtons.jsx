import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { withTracker } from 'meteor/react-meteor-data';
import { $ } from 'meteor/jquery';
import LoginErrorMessage from './LoginErrorMessage.jsx';

function CustomLoginButtons({ currentUser }) {
  function reducer(state, { attr, toggle, value }) {
    let newState = Object.assign({}, state);
    if (toggle) newState[attr] = !newState[attr];
    else newState[attr] = value;
    return newState;
  }

  let initialState = {
      signup: false,
      open: false,
      change: false,
      forgot: false,
      errorMessage: '',
      infoMessage: ''
    }, [ state, dispatch ] = useReducer(reducer, initialState)

  function handleView() {
    var { username } = currentUser;
    FlowRouter.go('profilePage', { username });
  }

  function handleEdit() {
    FlowRouter.go('profileEdit');
  }

  function trimmedElementValueById(id) {
    const element = document.getElementById(id);
    if (!element) {
      return null;
    }
    else {
      return element.value.replace(/^\s*|\s*$/g, '');
    }
  }

  function elementValueById(id) {
    const element = document.getElementById(id);
    if (!element)
      return null;
    else
      return element.value;
  }

  function login() {
    const username = trimmedElementValueById('login-username');
    const email = trimmedElementValueById('login-email');
    const usernameOrEmail =
      trimmedElementValueById('login-username-or-email');
    // notably not trimmed. a password could (?) start or end with a space
    const password = elementValueById('login-password');

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
        dispatch({ attr: 'errorMessage', value: error.reason });
      }
      else dispatch({ attr: 'errorMessage', value: '' });
    });
  }

  function logout() {
    Meteor.logout();
  }

  function forgotPassword() {
    const email = trimmedElementValueById('forgot-password-email');
    if (email.includes('@')) {
      Accounts.forgotPassword({ email: email }, error => {
        if (error)
          state.set({ errorMessage: error.reason || 'Unknown error' });
        else
          state.set({ infoMessage: 'Email sent' });
      });
    } else {
      state.set({ errorMessage: 'Invalid email' });
    }
  }

  function validateEmail(email) {
    return /[A-Za-z0-9._-]+@[A-Za-z0-9._-]/.test(email);
  }

  function signup() {
    const options = {}; // to be passed to Accounts.createUser

    const username = trimmedElementValueById('login-username');
    if (username !== null) {
      if (username.length < 3)
        return;
      else
        options.username = username;
    }

    const email = trimmedElementValueById('login-email');
    if (email !== null) {
      if (!validateEmail(email))
        return;
      else
        options.email = email;
    }

    const password = elementValueById('login-password');
    if (password.length < 6)
      return;
    else
      options.password = password;

    Accounts.createUser(options, error => {
      if (error) {
        dispatch({ attr: 'errorMessage',
          value: error.reason || 'Unknown error' });
      }
    });
  }

  function loginOrSignup() {
    if (state.signup) {
      signup();
      dispatch({ attr: 'infoMessage', value: 'Please verify email.' });
    }
    else {
      login();
    }
  }

  function changePassword() {
    // notably not trimmed. a password could (?) start or end with a space
    const oldPassword = elementValueById('login-old-password');

    // notably not trimmed. a password could (?) start or end with a space
    const password = elementValueById('login-password');
    if (password.length < 6)
      return;

    if (elementValueById('login-password-again') !== password) {
      dispatch({ attr: 'errorMessage', value: 'Passwords don\'t match' });
      return;
    }

    Accounts.changePassword(oldPassword, password, error => {
      if (error) {
        dispatch({ attr: 'errorMessage',
          value: error.reason || 'Unknown error' });
      } else {
        dispatch({ attr: 'infoMessage', value: 'Password changed' });
        document.getElementById('login-old-password').value = '';
        document.getElementById('login-password').value = '';
        document.getElementById('login-password-again').value = '';
      }
    });
  }

  function handleClick(event) {
    event.preventDefault();
    loginOrSignup();
  }

  function handleCreateClick(event) {
    event.preventDefault();
    $('#login-dropdown-list').addClass('open');
    $('#login-dropdown-list .dropdown-toggle').attr(
      'aria-expanded', 'true');
    dispatch({ attr: 'signup', toggle: true });
  }

  function logoutClick(event) {
    event.preventDefault();
    logout();
  }

  function handleKeyPress(event) {
    if (event.charCode === 13 && event.target.value !== '') {
      if (!state.signup) login();
    }
  }

  function handleChangePwd() {
    changePassword();
  }

  function handleChangePwdFlow(event) {
    event.preventDefault();
    dispatch({ attr: 'change', toggle: true });
  }

  function handleForgot(event) {
    event.preventDefault();
    dispatch({ attr: 'forgot', toggle: true });
  }

  function menuLoggedInChange() {
    return [
      <input id="login-old-password" type="password"
        placeholder="Old Password" className="form-control" />,
      <input id="login-password" type="password"
        placeholder="New Password" className="form-control" />,
      <input id="login-password-again" type="password"
        placeholder="New Password Again" className="form-control" />,
      <button className="btn btn-default btn-block"
        id="login-buttons-open-change-password"
        onClick={handleChangePwd}>Change password</button>,
      <button className="btn btn-block btn-primary"
        onClick={handleChangePwdFlow}
        id="login-buttons-logout">Sign out</button>
    ];
  }

  function menuLoggedInNoChange() {
    return [
      <button className="btn btn-default btn-block"
        id="login-buttons-view-profile" onClick={handleView}>
        View profile
      </button>,
      <button className="btn btn-default btn-block"
        id="login-buttons-edit-profile" onClick={handleEdit}>
        Edit profile
      </button>,
      <button className="btn btn-default btn-block"
        id="login-buttons-open-change-password"
        onClick={handleChangePwdFlow}>Change password</button>,
      <button className="btn btn-block btn-primary"
        onClick={logoutClick}
        id="login-buttons-Cancel">Sign out</button>];
  }

  function menuNone() {
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
        onKeyPress={handleKeyPress}/>,
      <button className="btn btn-primary col-xs-12 col-sm-12"
        id="login-buttons-password" type="button"
        onClick={handleClick}>
        Sign in
      </button>,
      <div id="login-other-options">
        <a id="forgot-password-link" className="pull-left"
          onClick={handleForgot}>
          Forgot password?
        </a>
        <a id="signup-link" onClick={handleCreateClick}
          className="pull-right">
          Create account
        </a>
      </div>];
  }

  function menuSignup() {
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
        onClick={handleClick}>
        Create
      </button>,
      <button id="back-to-login-link"
        onClick={handleCreateClick}
        className="btn btn-default col-xs-12 col-sm-12">Cancel
      </button>];
  }

  function menuForgot() {
    return [<input id="forgot-password-email" type="email" placeholder="Email"
      className="form-control" />, <button className=
      "btn btn-primary col-xs-12 col-sm-12" id="login-buttons-password" type=
      "button" onClick={forgotPassword}>
        Confirm
    </button>, <button id="back-to-login-link" onClick=
      {handleForgot} className=
      "btn btn-default col-xs-12 col-sm-12">Cancel</button>];
  }

  return (
    <li id="login-dropdown-list" className='dropdown'>
      <a className="dropdown-toggle" data-toggle="dropdown">
        {(currentUser ? currentUser.username :
          'Sign in / Join')}
        <b className="caret"></b>
      </a>
      <div className="dropdown-menu">
        {state.errorMessage ?
          <LoginErrorMessage errorMessage={state.errorMessage} />
          : null}
        {currentUser ?
          (state.change ? menuLoggedInChange() :
            menuLoggedInNoChange()) :
          (state.signup ? menuSignup() :
            (state.forgot ? menuForgot() : menuNone()))}
      </div>
    </li>
  );
}

CustomLoginButtons.propTypes = {
  currentUser: PropTypes.object
}

export default withTracker(() => {
  return {
    currentUser: Meteor.isClient ? Meteor.user() : null
  };
})(CustomLoginButtons);
