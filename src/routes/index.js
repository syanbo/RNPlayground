/**
 * Author   : Syan
 * Date     : 2018/4/15
 * Project [ RNPlayground ] Coded on WebStorm.
 */

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';

import Home from './Home';
import Car from './Car';
import My from './My';

const TabNav = TabNavigator(
  {
    Home: { screen: Home },
    Car: { screen: Car },
    My: { screen: My }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
        } else if (routeName === 'Car') {
          iconName = 'md-car';
        } else if (routeName === 'My') {
          iconName = 'md-paper';
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  }
);

const configAppNavigator = initialRouteName => {
  return StackNavigator(
    {
      Tab: {
        screen: TabNav
      }
    },
    {
      initialRouteName: initialRouteName,
      navigationOptions: {
        header: null
      }
    }
  );
};

export default configAppNavigator;
