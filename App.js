/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { observer, Provider, inject } from 'mobx-react';
import stores from './src/stores';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider {...stores}>
        <Cell />
      </Provider>
    );
  }
}

@inject('user')
@observer
class Cell extends Component {
  render() {
    console.log(this.props, '--');
    return (
      <View style={styles.container}>
        <Text>Hello Mobx {this.props.user.age}</Text>
        <Text
          onPress={() => {
            this.props.user.updateAge(this.props.user.age + 1);
          }}
        >
          修改 age
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    backgroundColor: 'red'
  }
});
