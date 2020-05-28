/**
 * Author   : Syan
 * Date     : 2020/5/27
 * Project [ RNPlayground ] Coded on WebStorm.
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
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
});

export default ProfileScreen;
