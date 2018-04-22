/**
 * Author   : Syan
 * Date     : 2018/4/15
 * Project [ RNPlayground ] Coded on WebStorm.
 */

import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react/native';

@inject('user')
@observer
export default class index extends PureComponent {
  handleChangeAge = () => {
    const { updateAge, age } = this.props.user;
    updateAge(age + 2);
  };
  render() {
    const { phone, age } = this.props.user;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>个人中心</Text>
        <Text style={styles.welcome}>车型库</Text>
        <Text style={styles.instructions}>手机号码{phone}</Text>
        <Text style={styles.instructions}>年龄{age}</Text>
        <TouchableOpacity onPress={this.handleChangeAge}>
          <Text>修改Age</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
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
