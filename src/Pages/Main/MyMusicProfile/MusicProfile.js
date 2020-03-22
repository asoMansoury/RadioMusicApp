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
import { Text ,View,Platform, StyleSheet,Dimensions, TouchableOpacity} from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {isUserLogged} from '../../Redux/Actions/index';
import {BaseApiUrl,mainColor,platformWidth,IS_IPHONE_X,STATUS_BAR_HEIGHT,HEADER_HEIGHT,NAV_BAR_HEIGHT} from './../../../CommonFiles/ConstantData';
import SpinnerButton from 'react-native-spinner-button';
import {initialAppStyle} from './../../../CommonFiles/Style';
import axios from 'axios';
import { connect } from 'react-redux';
import RNParallax from './../../CommonComponents/RNParallax/RNParallax';
import Edit from './pages/Edit';
import Setting from './pages/Setting';
import {AppContainer} from './ContentProfileTabView';

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
        return <AppContainer></AppContainer>
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
              useNativeDriver={true}
              alwaysShowTitle={1}
              isBackgroundScalable={true}
              headerMinHeight={HEADER_HEIGHT}
              headerMaxHeight={250}
              extraScrollHeight={20}
              navbarColor={'#388E3C'}
              title={this.props.userInformation.userName}
              titleStyle={styles.titleStyle}
              backgroundImage={{
                uri:
                  'http://getwallpapers.com/wallpaper/full/c/a/1/582139.jpg',
              }}
              backgroundColor="388E3C"
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