/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { observer, Provider } from 'mobx-react';
import makeInspectable from 'mobx-devtools-mst';
import stores from './src/stores';

makeInspectable(stores);
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider {...stores}>
        <Home />
      </Provider>
    );
  }
}

const Home = observer(props => {
  console.log(props);
  return (
    <View style={styles.container}>
      <Text>Hello Mobx {props.user.age}</Text>
      <Text
        onPress={() => {
          props.user.updateAge(30);
        }}
      >
        修改 age
      </Text>
    </View>
  );
});

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
    marginBottom: 5
  }
});
