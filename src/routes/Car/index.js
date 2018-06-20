/**
 * Author   : Syan
 * Date     : 2018/4/15
 * Project [ RNPlayground ] Coded on WebStorm.
 */

import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { queryBrands } from '../../services/api';
import { AutoFlatList, LoaderImage } from '../../components';
import { Theme } from '../../common';

export default class index extends PureComponent {
  static navigationOptions = {
    headerTitle: '车型库'
  };
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
          style={styles.list}
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
    const { name, avatar } = this.props;
    return (
      <TouchableOpacity style={styles.item}>
        <LoaderImage style={styles.image} source={{ uri: avatar }} />
        <Text>{name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Theme.statusBarHeight
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: Theme.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.12)',
    marginRight: 20
  },
  list: {
    backgroundColor: '#FFF'
  },
  item: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
