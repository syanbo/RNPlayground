/**
 * Author   : Syan
 * Date     : 2018/4/15
 * Project [ RNPlayground ] Coded on WebStorm.
 */

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import { BottomTabBar } from '../components';

import Exemples from './Exemples';
import Home from './Home';
import Car from './Car';
import My from './My';
import DeckSwipeScreen from './Exemples/DeckSwipeScreen';
import ScrollableTabScreen from './Exemples/ScrollableTabScreen';
import PopoverScreen from './Exemples/PopoverScreen';

const TabNav = createBottomTabNavigator(
  {
    Exemples: { screen: Exemples },
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
        } else {
          iconName = 'ios-color-filter';
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    },
    initialRouteName: 'Exemples',
    tabBarComponent: BottomTabBar,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  }
);

TabNav.navigationOptions = ({ navigation }) => {
  const { routes, index } = navigation.state;
  const navigationOptions = {};

  if (routes[index].routeName === 'Exemples') {
    navigationOptions.title = '首页';
  } else {
    navigationOptions.title = '其他';
  }

  return navigationOptions;
};
const configAppNavigator = initialRouteName => {
  return createStackNavigator(
    {
      Tab: {
        screen: TabNav
      },
      DeckSwipeScreen: {
        screen: DeckSwipeScreen
      },
      ScrollableTabScreen: {
        screen: ScrollableTabScreen
      },
      PopoverScreen: {
        screen: PopoverScreen
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
