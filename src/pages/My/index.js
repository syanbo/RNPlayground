/**
 * Author   : Syan
 * Date     : 2018/4/15
 * Project [ RNPlayground ] Coded on WebStorm.
 */

import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

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
class Index extends PureComponent {
  render() {
    const { totalTodos } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>个人中心</Text>
        <Text style={styles.welcome}>车型库</Text>
        <Text style={styles.instructions}> 代办事项数 {totalTodos}</Text>
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
