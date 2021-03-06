/* eslint-disable no-alert */
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
import { Text ,View, StyleSheet,Image, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {isUserLogged} from '../../Redux/Actions/index';
import {mainColor,STATUS_BAR_HEIGHT,HEADER_HEIGHT,NAV_BAR_HEIGHT} from './../../../CommonFiles/ConstantData';
import {animatedLoadinBtnConfig} from './../../../CommonFiles/Style';
import { connect } from 'react-redux';
import {AppContainer} from './ContentProfileTabView';
import {Header,Button} from 'react-native-elements';
import AnimateLoadingButton from 'react-native-animate-loading-button';


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
        this.segmentClick = this.segmentClick.bind(this);
        this._renderCenterComponentHeader = this._renderCenterComponentHeader.bind(this);
        this.renderSection = this.renderSection.bind(this);
        this._renderLeftComponent = this._renderLeftComponent.bind(this);
        // console.log('Props :-----------------',this.props.screenProps.screenProps.navigation.replace("AppIntro"));
        this.state={
          activeIndex:0
        }
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress',function(){
      return true;
    }.bind(this))
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

    renderContent=()=>{
        return <AppContainer />
    }

    renderSection=()=>{
      if(this.state.activeIndex===0){
        return(
          <View style={{flexDirection:'column',flexWrap:'wrap'}}>
            <Text>Page 0</Text>
          </View>
        )
      }
      else if(this.state.activeIndex===1){
        return(
          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            <Text>Page 1</Text>
          </View>
        )
      }
      else if(this.state.activeIndex===2){
        return(
          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            <Text>Page 2</Text>
          </View>
        )
      }
      else if(this.state.activeIndex===3){
        return(
          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            <Text>Page 3</Text>
          </View>
        )
      }
    }



    segmentClick(index){
      this.setState({
        ...this.state,
        activeIndex:index
        })
      }

    _renderCenterComponentHeader(){
      return(<View style={{width:'100%',alignItems:'center'}}>
        <Text style={{color:'white'}}>{this.props.userInformation.userName}</Text>
      </View>)
    }

    _renderLeftComponent(){
      return(
        <AntDesignIcon color="white" size={20} name="logout" onPress={()=>this.props.setUserLogging(false)}/>
      )
    }
      _onPressHandler() {
        this.loadingButton.showLoading(true);

        // mock
        setTimeout(() => {
          this.loadingButton.showLoading(false);
        }, 2000);
      }

    render(){
        return(
            // <ParallaxScrollView  >
            <View style={{flex:1,backgroundColor:'white'}}>
              <Header
                backgroundColor={mainColor}
                placement="left"
                leftComponent={this._renderLeftComponent}
                centerComponent={this._renderCenterComponentHeader}
                rightComponent={{ icon: 'home', color: '#fff' }}
                containerStyle={{
                  alignItems:'center',
                  justifyContent: 'center',
                  height:HEADER_HEIGHT
                }}
              />
                <View style={{paddingTop:10}}>
                  <View style={{flexDirection:'row'}}>
                      <View style={{flex:1,alignItems:'center'}}>
                        <Image style={{width:75,height:75,borderRadius:37.5}} source={{
                                uri: 'https://roocket.ir/public/images/2018/4/10/nodejs-2.png'}} />
                      </View>
                      <View style={{flex:3}}>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <View style={{alignItems:'center'}}>
                              <Text>20</Text>
                              <Text style={{fontSize:10,color:'grey'}}>Posts</Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                              <Text>20</Text>
                              <Text style={{fontSize:10,color:'grey'}}>Posts</Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                              <Text>20</Text>
                              <Text style={{fontSize:10,color:'grey'}}>Posts</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',paddingTop:10}}>
                              <View style={{justifyContent:'center',marginLeft:10,flex:3,height:30}}>
                              <AnimateLoadingButton
                                    ref={c=>{this.loadingButton = c}}
                                    width={200}
                                    height={animatedLoadinBtnConfig.height}
                                    title="Edit Profile"
                                    titleFontSize={animatedLoadinBtnConfig.titleFontSize}
                                    titleColor={animatedLoadinBtnConfig.titleColor}
                                    backgroundColor={animatedLoadinBtnConfig.backgroundColor}
                                    borderRadius={animatedLoadinBtnConfig.borderRadius}
                                    onPress={this._onPressHandler.bind(this)}
                                />
                              </View>
                              <View style={{flex:1,height:30,marginRight:10,marginLeft:5,justifyContent:'center'}}>
                              <Button
                                  title="Edit"
                                  type="solid"
                                  height={animatedLoadinBtnConfig.height}
                                  borderRadius={animatedLoadinBtnConfig.borderRadius}
                                  onPress={()=>{this.props.navigation.navigate("test")}}
                                />
                              </View>
                        </View>
                      </View>


                  </View>
                  <View style={{paddingVertical:10,paddingHorizontal:10}}>
                      <Text style={{fontWeight:'bold'}}>{this.props.userInformation.userName}</Text>
                      <Text>{this.props.userInformation.mobile}</Text>
                      <Text>www.RadioMusic.ir</Text>
                  </View>
                </View>
                <View>
                  <View style={{flexDirection:'row',justifyContent:'space-around',borderTopWidth:1,borderTopColor:'#ae5e5'}} >
                    <Button type="clear" onPress={()=>this.segmentClick(0)}  icon={<Icon style={[this.state.activeIndex===0?{color:'blue'}:{color:'grey'}]} name="menu" size={40}/>} />
                    <Button type="clear" onPress={()=>this.segmentClick(1)}   icon={<Icon style={[this.state.activeIndex===1?{color:'blue'}:{color:'grey'}]} name="message" size={40}/>} />
                    <Button type="clear" onPress={()=>this.segmentClick(2)}   icon={<Icon style={[this.state.activeIndex===2?{color:'blue'}:{color:'grey'}]} name="watch-later" size={40}/>} />
                    <Button type="clear" onPress={()=>this.segmentClick(3)}   icon={<Icon style={[this.state.activeIndex===3?{color:'blue'}:{color:'grey'}]} name="photo" size={40}/>} />
                  </View>
                </View>
                <View>
                  {this.renderSection()}
                </View>
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