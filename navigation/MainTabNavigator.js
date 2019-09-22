/* eslint-disable react/prop-types */
import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import FavoritesScreen from '../screens/FavoritesScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
)

HomeStack.navigationOptions = {
  tabBarLabel: 'Crypto Info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="bitcoin" />
  ),
}

HomeStack.path = ''

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
)

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="cog" />
  ),
}

SettingsStack.path = ''

const FavoritesStack = createStackNavigator(
  {
    Favorites: FavoritesScreen,
  },
  config
)

FavoritesStack.navigationOptions = {
  tabBarLabel: 'Favorites',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="star" />
  ),
}

FavoritesStack.path = ''

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  FavoritesStack,
  SettingsStack,
})

tabNavigator.path = ''

export default tabNavigator
