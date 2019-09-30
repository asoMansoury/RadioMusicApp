import React from 'react';
import { View, Text,Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppIntroPage from './src/Pages/AppIntro/AppIntroSlider';
import Index from './src/Pages/Authentication/index';;

const AppNavigator = createStackNavigator({
  AppIntro: {
    screen: AppIntroPage,
    navigationOptions:{
      header:null
    }
  },
  Authentication:{
    screen:Index,
    navigationOptions:{
      header:null
    }
  }
},
{
  initialRouteName: 'AppIntro',
});

export default createAppContainer(AppNavigator);