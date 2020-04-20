/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, StatusBar,Text} from 'react-native';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="black" />
        <Text>Index Test</Text>
      </View>
    );
  }
}
