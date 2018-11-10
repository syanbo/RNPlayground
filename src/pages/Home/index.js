/**
 * Author   : Syan
 * Date     : 2018/4/15
 * Project [ RNPlayground ] Coded on WebStorm.
 */

import React from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import CIcon from '../../components/IconFont';
import Config from '../../common/config';

@connect(
  state => {
    const todosIds = Object.keys(state.todos);
    return {
      totalTodos: todosIds.length,
      completedTodos: todosIds.filter(id => state.todos[id].done).length,
      todosArray: todosIds.map(id => ({
        ...state.todos[id],
        id,
      })),
    };
  },
  dispatch => ({
    toggleDone: id => dispatch.todos.toggleDone(id),
    remove: id => dispatch.todos.remove(id),
    asyncRemove: id => dispatch.todos.asyncRemove(id),
    addTodo: dispatch.todos.add,
  })
)
class Index extends React.Component {
  asyncRemove = id => {
    const { asyncRemove } = this.props;
    asyncRemove(id);
  };
  render() {
    console.log(Platform.Version, this.props);
    return (
      <View style={styles.container}>
        <Icon name="rocket" size={30} color="#900" />
        <CIcon.Button name="play" size={30} color="#FFF" style={styles.button}>
          自定义 IconFont
        </CIcon.Button>
        <CIcon name={'yes'} size={30} color={'red'} />
        <Text>Hello Redux</Text>
        {this.props.todosArray.map((item, index) => (
          <View key={String(index)}>
            <Text onPress={() => this.asyncRemove(item.id)}>{item.text}</Text>
          </View>
        ))}
        <TouchableOpacity
          onPress={() => {
            this.props.addTodo('你好');
          }}
        >
          <Text style={styles.welcome}>Add TODOs</Text>
        </TouchableOpacity>
        <Text>{Config.HOST_TITLE}</Text>
      </View>
    );
  }
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
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
    backgroundColor: 'red',
  },
  shadow: {
    marginTop: 10,
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'red',
    shadowOffset: {
      x: 0,
      y: 0,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
});
