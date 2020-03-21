/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable space-infix-ops */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import { Text ,View,Animated, StatusBar,ActivityIndicator, Image, Platform, StyleSheet,Dimensions, Linking, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {isUserLogged} from '../../Redux/Actions/index';
import {BaseApiUrl} from './../../../CommonFiles/ConstantData';
import SpinnerButton from 'react-native-spinner-button';
import {initialAppStyle} from './../../../CommonFiles/Style';
import axios from 'axios';
import { connect } from 'react-redux';
import {Validation} from './../../../CommonFiles/Validation';
import ParallaxScrollView from '../../CommonComponents/ParallaxScrollView/ParallaxScrollView';
import RNParallax from './../../CommonComponents/RNParallax/RNParallax';

const IS_IPHONE_X = Dimensions.get('window').height === 812 || Dimensions.get('window').height === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const COLORS = {
    white: '#fff',
    black: '#000',
    transparent:'transparent'
    // your colors
  }

const images = {
  background: 'https://roocket.ir/public/images/2018/4/10/nodejs-2.png',
};

const styles = StyleSheet.create({
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

class MusicProfile extends Component{
    constructor(props){
        super(props);
        this.renderContent = this.renderContent.bind(this);
    }

    renderContent=()=>{
        return(
            <View>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
                <Text>renderContent</Text>
            </View>
        )
    }


    renderNavBar = () => (
        <View style={styles.navContainer}>
          <View style={styles.statusBar} />
          <View style={styles.navBar}>
            <TouchableOpacity style={styles.iconLeft} onPress={() => {}}>
              <Icon name="add" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconRight} onPress={() => {}}>
              <Icon name="search" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )

    render(){
        return(
            // <ParallaxScrollView  >
            <View style={{flex:1}}>
            <RNParallax
              headerMinHeight={HEADER_HEIGHT}
              headerMaxHeight={250}
              extraScrollHeight={20}
              navbarColor={'green'}
              title="Parallax Header ~"
              titleStyle={styles.titleStyle}
              backgroundImage={images.background}
              backgroundImageScale={1.2}
              renderNavBar={this.renderNavBar}
              renderContent={this.renderContent}
              containerStyle={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              innerContainerStyle={{ flex: 1 }}
              scrollViewProps={{
                onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
                onScrollEndDrag: () => console.log('onScrollEndDrag'),
              }}
            />
          </View>
        )
    }
}

const mapstatesToProps =(state)=>{
    return {
        isUserLogged:state.user.isUserLogged,
        userInformation:state.user.userInformation
    }
}

const mapDispatchToProps = dispath =>{
  return{
    setUserLogging:value=>{
        dispath(isUserLogged(value))
    },
    saveUserInformation:value=>{
        dispath(saveUserInformation(value))
    }
  }
}

export default connect(mapstatesToProps,mapDispatchToProps)(MusicProfile);