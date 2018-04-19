/**
 * Author   : Syan
 * Date     : 2018/4/15
 * Project [ RNPlayground ] Coded on WebStorm.
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';

import { queryBrands } from '../../services/api';

@inject('user')
@observer
export default class index extends Component {
  /**
   * 使用Async方便简单直接 这是趋势
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    try {
      const res = await queryBrands();
      console.log(res);
    } catch (e) {
      console.log('请求失败', e);
    }
  }

  handleChangeAge = () => {
    const { updateAge, age } = this.props.user;
    updateAge(age + 2);
  };

  render() {
    const { phone, age } = this.props.user;
    return (
      <View style={styles.container}>
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
    marginTop: 5
  }
});
