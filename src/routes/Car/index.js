/**
 * Author   : Syan
 * Date     : 2018/4/15
 * Project [ RNPlayground ] Coded on WebStorm.
 */

import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { queryBrands } from '../../services/api';
import { AutoFlatList } from '../../components';

export default class index extends PureComponent {
  /**
   * 使用Async方便简单直接 这是趋势
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    // try {
    //   const res = await queryBrands();
    //   console.log(res);
    // } catch (e) {
    //   console.log('请求失败', e);
    // }
  }

  fetchData = page => {
    return queryBrands(page);
  };

  renderItem = ({ item }) => {
    return <Item {...item} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <AutoFlatList
          contentContainerStyle={styles.list}
          fetchData={this.fetchData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index + '' + item.id}
        />
      </View>
    );
  }
}

class Item extends PureComponent {
  render() {
    const { name } = this.props;
    console.log('----');
    return (
      <TouchableOpacity style={{ padding: 20 }}>
        <Text>{name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    paddingTop: 44
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
