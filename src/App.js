/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import stores from './stores/index';

import configAppNavigator from './routes';

export default class App extends Component {
  render() {
    const App = configAppNavigator('Tab');
    return (
      <Provider {...stores}>
        <App />
      </Provider>
    );
  }
}
