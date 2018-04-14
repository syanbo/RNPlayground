/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CIcon from './common/IconFont';
import { observer, Provider, inject } from 'mobx-react';
import stores from './stores/index';
import Config from './common/config';

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
    // CIcon.getImageSource('play', 20, 'red').then(source => console.log(source));
    return (
      <View style={styles.container}>
        <Icon name="rocket" size={30} color="#900" />
        <CIcon.Button
          name="play"
          size={30}
          color="#FFF"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 10
          }}
        >
          自定义 IconFont
        </CIcon.Button>
        <CIcon name={'yes'} size={30} color={'red'} />
        <Text>Hello Mobx {this.props.user.age}</Text>
        <Text
          onPress={() => {
            this.props.user.updateAge(this.props.user.age + 1);
          }}
        >
          修改 age
        </Text>
        <Text>{Config.HOST_TITLE}</Text>
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
