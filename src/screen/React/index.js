/**
 * Author   : Syan
 * Date     : 2020/6/3
 * Project [ RNPlayground ] Coded on WebStorm.
 */
import React from 'react';
import {View, Text, Button} from 'react-native';

export default class extends React.PureComponent {
  componentDidMount() {
    console.log('componentDidMount');
  }
  render() {
    return (
      <View>
        <SetState type="第一个" />
        <SetState type="第二个" />
      </View>
    );
  }
}

class SetState extends React.PureComponent {
  state = {
    count: 0,
  };

  /**
   * 1.调用setState不会立即更新
   * 2.所有组件使用的是同一套更新机制，当所有组件didmount后，父组件didmount，然后执行更新
   * 3.更新时会把每个组件的更新合并，每个组件只会触发一次更新的生命周期。
   */
  // componentDidMount() {
  //   const {type} = this.props;
  //   console.log('SetState调用setState');
  //   this.setState({
  //     count: this.state.count + 1,
  //   });
  //   console.log(type, 'state', this.state.count);
  //
  //   console.log('SetState调用setState');
  //   this.setState({
  //     count: this.state.count + 1,
  //   });
  //   console.log(type, 'state', this.state.count);
  // }

  /**
   * 1.在父组件didmount后执行
   * 2.调用setState同步更新
   */
  // componentDidMount() {
  //   const {type} = this.props;
  //
  //   setTimeout(() => {
  //     console.log('SetState调用setState');
  //     this.setState({
  //       count: this.state.count + 1,
  //     });
  //     console.log(type, 'state', this.state.count);
  //
  //     console.log('SetState调用setState');
  //     this.setState({
  //       count: this.state.count + 1,
  //     });
  //     console.log(type, 'state', this.state.count);
  //   });
  // }

  componentDidMount() {
    const {type} = this.props;

    this.handleAsync().then(() => {
      console.log('SetState调用setState');
      this.setState({
        count: this.state.count + 1,
      });
      console.log(type, 'state', this.state.count);

      console.log('SetState调用setState');
      this.setState({
        count: this.state.count + 1,
      });
      console.log(type, 'state', this.state.count);
    });
  }

  /**
   * 使用函数传递state不会被合并
   */
  // componentDidMount() {
  //   const {type} = this.props;
  //   console.log('调用setState', type);
  //   this.setState(
  //     preState => ({
  //       count: preState.count + 1,
  //     }),
  //     () => {
  //       console.log(type, 'state', this.state.count);
  //     },
  //   );
  //
  //   console.log('调用setState', type);
  //   this.setState(
  //     preState => ({
  //       count: preState.count + 1,
  //     }),
  //     () => {
  //       console.log(type, 'state', this.state.count);
  //     },
  //   );
  //   console.log(type, 'state', this.state.count);
  // }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  handleAsync = () => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  };

  add = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    const {count} = this.state;
    return (
      <View>
        <Text>{count}</Text>
        <Button title="+" onPress={this.add} />
      </View>
    );
  }
}
