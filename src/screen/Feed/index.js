/**
 * Author   : Syan
 * Date     : 2020/5/27
 * Project [ RNPlayground ] Coded on WebStorm.
 */
import React from 'react';
import {Text, View, ScrollView, Image} from 'react-native';
import Images from '~/assets';
import StyleSheet, {IgnoreValue} from '~/utils/StyleSheet';

const list = [
  {
    source: Images.image001,
    title: '老图片',
  },
  {
    source: Images.image002,
    title: '老图片',
  },
  {
    source: Images.image003,
    title: '老图片',
  },
  {
    source: Images.image004,
    title: '老图片',
  },
  {
    source: Images.image005,
    title: '老图片',
  },
  {
    source: Images.image006,
    title: '老图片',
  },
  {
    source: Images.image007,
    title: '老图片',
  },
];

function FeedScreen() {
  return (
    <ScrollView style={styles.container}>
      {list.map(({source, title}, index) => (
        <View key={String(index)}>
          <Image style={styles.cell} source={source} />
          <Text style={styles.title}>{title}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  cell: {
    width: new IgnoreValue(StyleSheet.screenW),
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
  },
});

export default FeedScreen;
