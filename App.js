import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Home from './screen/Home';
import MyFridge from './screen/MyFridge';
import RecipeResults from './screen/RecipeResults';
import Recipe from './screen/Recipe';

// ignore yellow box warnings
console.ignoredYellowBox = ['Warning: isMounted', 'Remote debugger'];

const MENU_NAV = createStackNavigator({
  MyFridge: MyFridge,
  RecipeResults: RecipeResults,
  Recipe: Recipe,
}, {
  initialRouteName: 'MyFridge',
  navigationOptions: {
    title: "WhatsCookin",
    headerStyle: {
      backgroundColor: '#805a3b',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
    },
    headerLeft: <View />,
    headerRight: <View />,
  }
});

const ROOT_NAV = createStackNavigator({
  Home: Home,
  Menu: MENU_NAV,
}, {
  initialRouteName: 'Home',
  mode: 'modal',
  headerMode: 'none',
});


class App extends Component {
  render() {
    return <ROOT_NAV />;
  }
}

export default App;