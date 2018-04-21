/**
 * Author   : Syan
 * Date     : 2018/4/22
 * Project [ RNPlayground ] Coded on WebStorm.
 */

import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { px2dp, Theme } from '../common';

export default class AutoFlatList extends PureComponent {
  static propTypes = {
    ...FlatList.propTypes,
    fetchData: PropTypes.func.isRequired, //传入页数返回一个Promise
    enableLoadMore: PropTypes.bool, //是否能上拉加载
    enableRefresh: PropTypes.bool, //是否能下拉刷新
    judgeNoMoreData: PropTypes.func, //传入newData返回一个boolean决定是否没有最新数据
    dataChange: PropTypes.func, //传入newData返回一个boolean决定是否没有最新数据
    catchHandle: PropTypes.func, //fetchData的异常捕获处理
    ListLoadMoringComponent: PropTypes.element, //正在加载更多的组件
    ListLoadMoredComponent: PropTypes.element, //加载更多完成的组件
    ListNoMoreDataComponent: PropTypes.element, //没有更多数据的组件
    onRefreshCallBack: PropTypes.func, //下拉刷新的回调事件
    loadingView: PropTypes.element //初次加载的loading视图
  };

  static defaultProps = {
    enableLoadMore: true,
    enableRefresh: true,
    ListFooterComponent: <View style={{ height: px2dp(60) }} />,
    judgeNoMoreData: (newData, page) => newData.length < 10
  };

  state = {
    data: [],
    isTopRefresh: false,
    isEndRefresh: false,
    isNoMoreData: false,
    isLoading: true,
    error: null
  };

  page = 1;

  get isArrayEmpty() {
    return this.state.data.length === 0;
  }

  setData = data => {
    const { error, isTopRefresh } = this.state;
    const { judgeNoMoreData, dataChange } = this.props;

    console.log('数据', data, isTopRefresh, error);
    if (error) {
      this.setState({
        error: null
      });
    }

    this.setState({
      isNoMoreData: judgeNoMoreData(data, this.page),
      isLoading: false
    });

    if (this.page === 1) {
      this.setState({
        data
      });
      if (isTopRefresh) {
        this.setState({
          isTopRefresh: false
        });
      }
    } else {
      const newData = [...this.state.data, ...data];
      this.setState({
        data: newData
      });
      setTimeout(() => {
        this.setState({
          isEndRefresh: false
        });
      }, 100);
    }
    dataChange && dataChange(this.state.data);
  };

  componentDidMount() {
    this.loadData();
  }

  /**
   * 返回数据
   * @returns {Array|any}
   */
  getItems() {
    return this.state.data;
  }

  /**
   * 加载数据
   */
  loadData = () => {
    const { error } = this.state;
    const { fetchData, catchHandle } = this.props;
    if (error) {
      this.setState({
        isLoading: true
      });
    }
    fetchData(this.page)
      .then(data => this.setData(data))
      .catch(e => {
        this.setState({
          isLoading: false
        });
        if (catchHandle) {
          catchHandle(e);
        } else {
          this.setState({
            error: e
          });
        }
      });
  };

  onEndReached = () => {
    const { data, isTopRefresh, isEndRefresh, isNoMoreData } = this.state;
    const { enableLoadMore } = this.props;
    if (
      data.length === 0 ||
      isTopRefresh ||
      isEndRefresh ||
      isNoMoreData ||
      !enableLoadMore
    )
      return;

    this.page += 1;
    this.setState({
      isEndRefresh: true
    });
    this.loadData();
  };

  onRefresh = () => {
    const { onRefreshCallBack } = this.props;
    this.page = 1;
    this.setState({
      isTopRefresh: true,
      isNoMoreData: false
    });

    this.loadData();
    onRefreshCallBack && onRefreshCallBack();
  };

  render() {
    const { data, isLoading, isTopRefresh, error } = this.state;
    const { loadingView, enableRefresh, style } = this.props;

    if (isLoading) {
      return (
        loadingView || (
          <View>
            <Text>加载中...</Text>
          </View>
        )
      );
    }
    if (error) {
      return (
        <View>
          <Text>出错了</Text>
        </View>
      );
    }
    if (this.isArrayEmpty) {
      return (
        <View>
          <Text>空视图</Text>
        </View>
      );
    }

    return (
      <FlatList
        refreshing={isTopRefresh}
        onRefresh={enableRefresh ? this.onRefresh : null}
        onEndReachedThreshold={0.1}
        onEndReached={this.onEndReached}
        data={data}
        keyExtractor={(item, index) => index + ''}
        {...this.props}
        style={[styles.container, style]}
        ListFooterComponent={<FootView {...this.props} {...this.state} />}
      />
    );
  }
}

export class FootView extends PureComponent {
  render() {
    const {
      data,
      isEndRefresh,
      isNoMoreData,
      onEndReached,
      ListLoadMoringComponent,
      ListNoMoreDataComponent,
      ListLoadMoredComponent,
      enableLoadMore
    } = this.props;

    if (data.length === 0) {
      return null;
    }
    if (ListLoadMoringComponent && isEndRefresh) {
      return ListLoadMoringComponent;
    }
    if (ListNoMoreDataComponent && isNoMoreData) {
      return ListNoMoreDataComponent;
    }
    if (ListLoadMoringComponent && !isEndRefresh) {
      return ListLoadMoredComponent;
    }
    return enableLoadMore ? (
      <View style={styles.loadMoreView}>
        {isEndRefresh ? <ActivityIndicator /> : null}
        <Text
          style={styles.text}
          onPress={() => {
            onEndReached();
          }}
        >
          {isEndRefresh
            ? '正在加载中...'
            : isNoMoreData
              ? '------暂无数据------'
              : '点击加载更多'}
        </Text>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.bgColor
  },
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadMoreView: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 13
  },
  emptyImage: {
    width: px2dp(93),
    height: px2dp(100),
    marginTop: px2dp(160)
  },
  emptyText: {
    ...Theme.medium,
    color: Theme.black26,
    fontSize: 16,
    marginTop: px2dp(36)
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center'
  }
});
