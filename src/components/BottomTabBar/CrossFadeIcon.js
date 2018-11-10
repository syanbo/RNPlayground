/**
 * Author   : Syan
 * Date     : 2018/5/5
 * Project [ PriceControlApp ] Coded on WebStorm.
 * @flow
 */

import React from 'react';
import { View, StyleSheet, Platform, DeviceEventEmitter, Text } from 'react-native';

type Props = {
  route: any,
  activeTintColor: any,
  inactiveTintColor: any,
  renderIcon: any,
};

export default class TabBarIcon extends React.Component<Props> {
  state = {
    count: 0,
  };
  componentDidMount() {
    DeviceEventEmitter.addListener('changeTabBadge', (routeName, count) => {
      const { route } = this.props;
      if (routeName === route.routeName) {
        this.setState({
          count: count,
        });
      }
    });
  }

  render() {
    const { route, activeTintColor, inactiveTintColor, renderIcon, focused } = this.props;

    const { count } = this.state;

    // console.log(route, focused);
    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them.
    return (
      <View style={styles.icon}>
        {renderIcon({
          route,
          focused,
          tintColor: focused ? activeTintColor : inactiveTintColor,
        })}
        <Badge count={count} focused={focused} />
      </View>
    );
  }
}

const Badge = ({ count, focused }) => {
  if (count > 0) {
    if (focused) {
      return (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
        </View>
      );
    } else {
      return <View style={styles.dian} />;
    }
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  dian: {
    backgroundColor: 'red',
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    ...Platform.select({
      ios: {
        right: -8,
        top: -4,
      },
      android: {
        right: 18,
        top: -0,
      },
    }),
  },
  badge: {
    backgroundColor: 'red',
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        right: -16,
        top: -4,
      },
      android: {
        right: 18,
        top: -0,
      },
    }),
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    marginHorizontal: 5,
  },
});
