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
  FlatList
} from 'react-native';
import { Theme } from '../../common';

export default class index extends PureComponent {
  cells = [{ name: 'DeckSwiperScreen' }];

  pushExemple = name => {
    const { navigation } = this.props;
    console.log(navigation);
    navigation.push(name);
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
    const { name, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.item} onPress={() => onPress(name)}>
        <Text>{name}</Text>
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
