/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from 'react';
import {View, Text, Button} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AppIntroPage from './src/Pages/AppIntro/AppIntroSlider';
import Main from './src/Pages/Main/Main';
import {Provider} from 'react-redux';
import {store, persistor} from './src/Pages/Redux/Store/index';

const MainNavigator = createStackNavigator(
  {
    AppIntro: {
      screen: AppIntroPage,
      navigationOptions: {
        header: null,
      },
    },
    MainPage: {
      screen: Main,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'AppIntro',
  },
);

const AppContainer = createAppContainer(MainNavigator);
import {NavigationContainer} from '@react-navigation/native';

class AppLoader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <AppContainer />
        </NavigationContainer>
      </Provider>
    );
  }
}
export default AppLoader;
