/* eslint-disable no-unused-vars */
import React from 'react';
import {View, Text, Button} from 'react-native';
import {createAppContainer, NavigationContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AppIntroPage from './src/Pages/AppIntro/AppIntroSlider';
import Index from './src/Pages/Authentication/index';
import {connect, Provider} from 'react-redux';
import store from './src/Pages/Redux/Store/index';

const RootNavigator = createStackNavigator(
  {
    AppIntro: {
      screen: AppIntroPage,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'AppIntro',
  },
);

const AppContainer = createAppContainer(RootNavigator);

class AppNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <AppContainer screenProps={this.props} />
      </NavigationContainer>
    );
  }
}

export default connect(
  null,
  null,
)(AppNavigation);
