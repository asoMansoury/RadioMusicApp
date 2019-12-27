import React,{Component} from 'react';
import {Text} from 'react-native';
import Login from './Login';
import Register from './Register';
import {createMaterialTopTabNavigator,createTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';


const TabScreen = createMaterialTopTabNavigator({
    Register:{screen:Register},
    Login:{screen:Login}
},{
    tabBarPosition:'top',
    swipeEnabled:true,
    animationEnabled:true,
    tabBarOptions:{
        activeTintColor:'#FFFFFF',
        inactiveTintColor:'F8F8F8',
        style: {
            backgroundColor: '#633689',
          },
          labelStyle: {
            textAlign: 'center',
          },
          indicatorStyle: {
            borderBottomColor: '#87B56A',
            borderBottomWidth: 2,
          }
    }
})

export default createAppContainer(TabScreen)