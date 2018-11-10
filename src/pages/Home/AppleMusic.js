/**
 * Author   : Syan
 * Date     : 2018/4/22
 * Project [ RNPlayground ] Coded on WebStorm.
 */

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

export default class AppleMusic extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
