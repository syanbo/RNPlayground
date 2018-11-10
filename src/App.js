/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import stores from './models/index';

import configAppNavigator from './pages';

export default class App extends Component {
  state = {
    initApp: null,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        initApp: 'Tab',
      });
    }, 100);
  }

  render() {
    const { initApp } = this.state;
    if (initApp) {
      const App = configAppNavigator(initApp);
      return (
        <Provider store={stores}>
          <App />
        </Provider>
      );
    }

    return null;
  }
}
