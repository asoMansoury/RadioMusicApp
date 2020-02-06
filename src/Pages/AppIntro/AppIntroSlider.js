import React from 'react';
import { View,Text,Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { initialAppStyle } from '../../CommonFiles/Style.js';
import Index from '../Authentication/index';
import Main from './../Main/Main';
import { connect } from 'react-redux';
import {setUserLogged} from '../Redux/Actions/index';

const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: "https://roocket.ir/public/images/2017/5/25/cms-laravel-cover-2.jpg",
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: "https://roocket.ir/public/images/2017/5/25/cms-laravel-cover-2.jpg",
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: "https://roocket.ir/public/images/2017/5/25/cms-laravel-cover-2.jpg",
    backgroundColor: '#22bcb5',
  }
];
 

 class AppIntro extends React.Component {
  constructor(props){
    super(props);

    if(this.props.user.isFirstTimeLogIn==true)
      this.props.navigation.replace("MainPage");
  }
  _renderItem = (item) => {
    const imageUrl = item.item.image.toString();
    return (
      <View style={initialAppStyle.slide1}>
        
        <Image source={{uri: imageUrl}} style={{height:'100%'}} />
        <Text >{item.text}</Text>
      </View>
    );
  }

  _onDone = () => {
      this.props.setUserIsFirstTimeLogin(false);
      this.props.navigation.replace("MainPage");
  }

  render() {
    if(this.props.user.isFirstTimeLogIn){
      return <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone} />;
    }else{
     return <Main></Main>
    }
  }
}

const mapStateToProps = (state)=>{
  return {
    user:state.user
  }
}

const mapDispatchToProps = dispath =>{
  return{
    setUserIsFirstTimeLogin:isLogged =>{
      dispath(setUserLogged(isLogged))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppIntro);