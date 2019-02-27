import { Meteor } from 'meteor/meteor';

const requiredPackages = {
  react: '16.x',
  'react-dom': '16.x',
  'react-transition-group': '2.x',
  'immutability-helper': '2.9.1'
};

import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
checkNpmVersions(requiredPackages, 'react-runtime');

const React = require('react');
const ReactDOM = require('react-dom');

React.addons = {
  TransitionGroup: require('react-transition-group').TransitionGroup,
  CSSTransitionGroup: require('react-transition-group').CSSTransitionGroup,
  update: require('immutability-helper'),
  PureRenderMixin: React.PureComponent,
};

if (Meteor.isDevelopment) {
  React.addons.TestUtils = require('react-dom/test-utils');
}

let ReactDOMServer;
if (Meteor.isServer) {
  ReactDOMServer = require('react-dom/server');
}

export { React, ReactDOM, ReactDOMServer };
