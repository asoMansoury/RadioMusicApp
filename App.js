import React from 'react';
import { View, Text,Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppIntroPage from './src/Pages/AppIntro/AppIntroSlider';
import Index from './src/Pages/Authentication/index';;
import Main from './src/Pages/Main/Main';
import {connect,Provider} from 'react-redux';
import store from './src/Pages/Redux/Store/index'
const MainNavigator = createStackNavigator({
  AppIntro: {
    screen: AppIntroPage,
    navigationOptions:{
      header:null
    }
  },
  MainPage:{
    screen:Main,
    navigationOptions:{
      header:null
    }
  }
},
{
  initialRouteName:"AppIntro"
});

const AppContainer = createAppContainer(MainNavigator);

class AppLoader extends React.Component{
  render(){
    
    return(
      <Provider store={store}>
        <AppContainer></AppContainer>
      </Provider>
    )
  }
}


export default AppLoader;