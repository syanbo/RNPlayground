/**
 * Author   : Syan
 * Date     : 2018/5/11
 */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Orientation from 'react-native-orientation';
import { Popover } from '../../components';

export default class PopoverScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Orientation.lockToLandscapeLeft();
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  handleShowPop = () => {
    this.popButton.measure((ox, oy, width, height, px, py) => {
      this.popView.show({ x: px, y: py, width: width, height: height });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ margin: 44 }}
          ref={p => (this.popButton = p)}
          onPress={this.handleShowPop}
        >
          <Text>出来</Text>
        </TouchableOpacity>
        <PopView ref={p => (this.popView = p)} />
      </View>
    );
  }
}

class PopView extends React.PureComponent {
  state = {
    isVisible: false,
    buttonRect: { x: 0, y: 0, width: 0, height: 0 }
  };

  show = buttonRect => {
    this.setState({
      buttonRect,
      isVisible: true
    });
  };

  close = () => {
    this.setState({
      isVisible: false
    });
  };

  render() {
    const { isVisible, buttonRect } = this.state;
    return (
      <Popover
        isVisible={isVisible}
        fromRect={buttonRect}
        placement="bottom"
        contentStyle={{ backgroundColor: 'transparent' }}
        onClose={this.close}
      >
        <Text>你好</Text>
        <Text>你好</Text>
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
});
