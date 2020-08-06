/**
 * Author   : Syan
 * Date     : 2020/5/27
 * Project [ RNPlayground ] Coded on WebStorm.
 */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Debug');
        }}>
        <Text>跳转CodePush Debug 页面</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('ImagePicker');
        }}>
        <Text>图片选择 页面</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('React');
        }}>
        <Text>React 测试</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  button: {
    paddingVertical: 20,
  },
});

export default HomeScreen;
