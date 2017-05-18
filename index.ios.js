/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Main from './src/Main';

export default class TreBusNative extends Component {
  render() {
    return (
      <Main />
    );
  }
}


AppRegistry.registerComponent('TreBusNative', () => TreBusNative);
