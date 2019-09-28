import React from 'react';
import { View, Text,Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppIntroPage from './src/Pages/AppIntro/AppIntroSlider';


const AppNavigator = createStackNavigator({
  AppIntro: {
    screen: AppIntroPage,
  }
},
{
  initialRouteName: 'AppIntro',
});

export default createAppContainer(AppNavigator);