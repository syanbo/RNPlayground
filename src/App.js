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
  state = {
    initApp: null
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        initApp: 'Tab'
      });
    }, 100);
  }

  render() {
    const { initApp } = this.state;
    if (!!initApp) {
      const App = configAppNavigator(initApp);
      return (
        <Provider {...stores}>
          <App />
        </Provider>
      );
    }

    return null;
  }
}
