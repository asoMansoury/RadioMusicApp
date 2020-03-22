/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Edit from './pages/Edit';
import Setting from './pages/Setting';
import {View, Text,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TabNavigator = createMaterialTopTabNavigator(
  {
    Edit: Edit,
    Setting: Setting,
  },
  {
    tabBarComponent: props => <CustomTabBar />,
  },
);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    height: 56,
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: 'blue',
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
  },
});
class CustomTabBar extends React.Component {
    constructor(props){
        super(props);
    }
  render() {
    // const {navigation} = this.props;
    // const routes = navigation.state.routes;

    return (
      <View style={styles.container}>
          <Text>Hello</Text>
      </View>
    );
  }

//   navigationHandler = routeName => {
//     this.props.navigation.navigate(routeName);
//   };
}

export const AppContainer = createAppContainer(TabNavigator);

// https://stackoverflow.com/questions/54409280/how-to-add-a-custom-component-to-creatematerialtoptabnavigator-tab-bar