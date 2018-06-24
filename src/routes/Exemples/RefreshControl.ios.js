/**
 * 类似华为手机的下拉刷新
 */
import React, { Component } from 'react';
import { Animated, RefreshControl } from 'react-native';

export default class RefreshControlAndroid extends Component {
  state = {
    text: '下拉刷新',
    rotate: new Animated.Value(0),
    refreshing: false
  };

  _onRefresh = () => {
    let { onRefresh } = this.props;
    this.setState({
      refreshing: true,
      text: '正在刷新'
    });
    onRefresh && onRefresh();
  };
  finishRefresh = params => {
    this.setState({
      refreshing: false,
      text: '下拉刷新'
    });
  };
  render() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
        title={this.state.text}
      />
    );
  }
}
