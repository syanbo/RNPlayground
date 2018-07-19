/**
 * Author   : Syan
 * Date     : 2018/5/11
 */

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  DeviceEventEmitter
} from 'react-native';
import { Theme } from '../../common';

export default class index extends PureComponent {
  cells = [
    { routeName: 'DeckSwipeScreen', title: 'Swipe手势组件' },
    { title: '设置底部TabBar角标', type: 'badge' },
    { routeName: 'ScrollableTabScreen', title: 'ScrollableTabView' },
    { routeName: 'PopoverScreen', title: 'PopoverScreen' },
    { routeName: 'SectionListScreen', title: 'SectionListScreen' }
  ];

  pushExemple = ({ routeName, type }) => {
    const { navigation } = this.props;
    !!routeName && navigation.push(routeName);
    if (type === 'badge') {
      DeviceEventEmitter.emit('changeTabBadge', 'Car', 121);
    }
  };

  renderItem = ({ item }) => {
    return <Item {...item} onPress={this.pushExemple} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.cells}
          renderItem={this.renderItem}
          keyExtractor={({ name }) => name}
        />
      </View>
    );
  }
}

class Item extends PureComponent {
  render() {
    const { title, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.item} onPress={() => onPress(this.props)}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: Theme.statusBarHeight
  },
  list: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  item: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
