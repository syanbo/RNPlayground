import React from 'react';
import CodePush from 'react-native-code-push';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './screen/Home';
import FeedScreen from './screen/Feed';
import ProfileScreen from './screen/Profile';
import DebugScreen from './screen/Debug';
import ImagePicker from './screen/ImagePicker';
import ReactTest from './screen/React';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feed',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

class App extends React.PureComponent {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MyTab}
            options={{
              headerShown: false,
              title: '首页',
            }}
          />
          <Stack.Screen name="Debug" component={DebugScreen} />
          <Stack.Screen name="ImagePicker" component={ImagePicker} />
          <Stack.Screen name="React" component={ReactTest} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: true,
})(App);
