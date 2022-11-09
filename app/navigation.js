import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Home from './screens/home';
import Wardrobe from './screens/wardrobe';
import Camera from './screens/camera';
import Preferences from './screens/preferences';

let screen = Dimensions.get('window');

export const Tabs = TabNavigator({
  'Home': {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home'
    //   tabBarIcon: ({ tintColor }) => <Icon name="open-book" type="entypo" size={28} color={tintColor} />
    },
  },
  'Wardrobe': {
    screen: Wardrobe,
    navigationOptions: {
      tabBarLabel: 'Wardrobe'
    //   tabBarIcon: ({ tintColor }) => <Icon name="ios-map-outline" type="ionicon" size={28} color={tintColor} />
    },
  },
  'Camera': {
    screen: Camera,
    navigationOptions: {
      tabBarLabel: 'Camera'
    //   tabBarIcon: ({ tintColor }) => <Icon name="ios-add-circle-outline" type="ionicon" size={28} color={tintColor} />
    },
  },
  'Preferences': {
    screen: Preferences,
    navigationOptions: {
      tabBarLabel: 'Preferences'
    //   tabBarIcon: ({ tintColor }) => <Icon name="list" type="entypo" size={28} color={tintColor} />
    },
  },
});

export const createRootNavigator = () => {
  return StackNavigator(
    {
      Tabs: {
        screen: Tabs,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
  );
};