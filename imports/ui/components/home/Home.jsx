import React, { Component } from 'react';
import Support from '../includes/Support.jsx';
import HomeFeaturedPost from './HomeFeaturedPost.jsx';
import HomeContent from './HomeContent.jsx';
import { _ } from 'underscore';
import { Metamorph } from 'react-metamorph';

export default class Home extends Component {
  componentDidMount() {
    /* This next section makes our sticky nav possible. */
    var myNavBar = {
      flagAdd: true,
      objs: [],
      init: function (objs) {
        this.objs = objs;
        for (var i = 0; i < this.objs.length; i++) {
          this.objs[i].addClass('fixed-theme');
        }
      },
      add: function() {
        if (this.flagAdd) {
          for (var i = 0; i < this.objs.length; i++) {
            this.objs[i].addClass('fixed-theme');
          }
          this.flagAdd = false;
        }
      },
      remove: function() {
        if (!this.flagAdd) {
          for (var i = 0; i < this.objs.length; i++) {
            this.objs[i].removeClass('fixed-theme');
          }
          this.flagAdd = true;
        }
      }
    };

    /* Init the object. Pass the object the array of elements
     * that we want to change when the scroll goes down. */
    myNavBar.init([$('.navbar'), $('.navbar-default'), $('.dropdown-menu')]);

    /* Function that manages the direction of the scroll. */
    function offSetManager() {
      var offset = window.pageYOffset + $('.navbar').height();
      var height = $('.landing').height();

      if (height < offset) {
        myNavBar.remove();
      }
      else if (height >= offset){
        myNavBar.add();
      }
    }

    /* Bind to the document scroll detection. */
    window.onscroll = function() {
      offSetManager();
    }

    /* We have to do a first detectation of offset because the page
     * could be load with scroll down set. */
    offSetManager();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps, this.props) ||
      !_.isEqual(nextState, this.state);
  }

  componentWillUnmount() {
    var objs = [$('.navbar'), $('.navbar-default'), $('.dropdown-menu')]
    for (var i = 0; i < objs.length; i++) {
      objs[i].removeClass('fixed-theme');
    }
    window.scroll(0, 0);
    window.onscroll = null;
  }

  render() {
    return [
      <Metamorph title='KTUH FM Honolulu | Radio for the People'
        image="https://ktuh.org/img/ktuh-logo.jpg"
        description="KTUH Homepage" />,
      <HomeFeaturedPost key='featured-post' />,
      <HomeContent key='main-content' />,
      <Support key='support' />
    ];
  }
}
