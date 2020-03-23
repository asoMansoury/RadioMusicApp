/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Edit from './pages/Edit';
import Setting from './pages/Setting';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const TabNavigator = createMaterialTopTabNavigator(
  {
    Edit: Edit,
    Setting: Setting,
  },
  {
    tabBarComponent: props => <CustomTabBar screenProps={props} />
  },
);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    height: 56,
    width: '100%',
    borderTopWidth: 2,
    borderTopColor: 'black',
    backgroundColor: '#ffffff',
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
  },
});
class CustomTabBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props.screenProps;
    const routes = navigation.state.routes;
    const widthPercent = 100 / routes.length;
    const calc = "'" + widthPercent.toString() + "%'";

    return (
      <View style={styles.container}>
        {routes.map((item, index) => {
          return (
            <View
              style={[
                {
                  borderBottomWidth: 3,
                  borderBottomColor: 'white',
                  width: '50%',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <TouchableWithoutFeedback
                onPress={() => this.navigationHandler(item.routeName)}>
                <Icon size={25} name={'settings'} />
              </TouchableWithoutFeedback>
            </View>
          );
        })}
      </View>
    );
  }

  navigationHandler = routeName => {
    this.props.screenProps.navigation.navigate(routeName);
  };
}

export const AppContainer = createAppContainer(TabNavigator);

// https://stackoverflow.com/questions/54409280/how-to-add-a-custom-component-to-creatematerialtoptabnavigator-tab-bar
