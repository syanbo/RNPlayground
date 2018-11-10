/**
 * Author   : Syan
 * Date     : 2018/7/19
 * Project [ RNPlayground ] Coded on WebStorm.
 */

import React, { PureComponent } from 'react';
import { StyleSheet, View, SectionList, Text, FlatList, TouchableOpacity } from 'react-native';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

export default class SectionListScreen extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderSectionHeader = ({ section: { title } }) => (
    <ScrollableTabView
      style={{ height: 1200 }}
      renderTabBar={() => <DefaultTabBar someProp={'here'} />}
    >
      <View style={{ height: 1200, backgroundColor: 'red' }} tabLabel="React" />
      <List tabLabel="Flow" />
      <View tabLabel="Jest" />
    </ScrollableTabView>
  );

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          renderItem={({ item, index, section }) => <Text key={index}>{item}</Text>}
          renderSectionHeader={this.renderSectionHeader}
          ListHeaderComponent={
            <TouchableOpacity
              style={{ height: 200, backgroundColor: '#000' }}
              onPress={() => {
                const { navigation } = this.props;
                navigation.navigate('PopoverScreen');
              }}
            />
          }
          ListFooterComponent={<View style={{ height: 200, backgroundColor: '#000' }} />}
          sections={[{ title: 'Title1', data: [] }]}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

class List extends PureComponent {
  render() {
    return (
      <FlatList
        data={[{ key: 'a' }, { key: 'b' }]}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingTop: 40,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
