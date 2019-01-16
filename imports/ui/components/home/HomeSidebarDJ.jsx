import React, { Component } from 'react';
import { scorpius } from 'meteor/scorpiusjs:core';

export default class HomeSidebarDJ extends Component {
  render() {
    if (scorpius.dictionary.get('mainPage.monthlyDJName'))
      return (
        <div className='djotm'>
          <h4>DJ OF THE MONTH</h4>
          <p className='djotm__stroke'></p>
          <a className='djotm__link' href=
            {scorpius.dictionary.get('mainPage.monthlyDJLink', '')}>
            <img className='djotm__img' src= {scorpius.dictionary.get(
              'mainPage.monthlyDJImgUrl', ''
            )} />
            <h3>
              {scorpius.dictionary.get('mainPage.monthlyDJName')}
            </h3>
          </a>
          <p className='djotm__blurb'>
            {scorpius.dictionary.get('mainPage.monthlyDJBlurb', '')}
          </p>
        </div>
      );
    else return null;
  }
}
