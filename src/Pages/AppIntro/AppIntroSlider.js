/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, ActivityIndicator, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {initialAppStyle} from '../../CommonFiles/Style.js';
import Main from './../Main/Main';
import {connect} from 'react-redux';
import {setUserRunning} from './../Redux/Actions/index';
import {BaseApiUrl, TLID, PageKey} from './../../CommonFiles/ConstantData';
import Axios from 'axios';
let slidesconst = [];

class AppIntro extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.user.isFirstTimeRunning == true) {
      this.props.navigation.replace('MainPage');
    // }
    this.state = {
      slide: [],
    };
  }

  componentWillMount() {
    const data = {
      TLanguageID: TLID.English,
      Key: PageKey.AppIntro,
    };
    Axios.post(BaseApiUrl + '/FrontEndApi/getFiles', data)
      .then(res => {
        if (res.data.isError == true) {
        } else {
          slidesconst = res.data.FrontPageName.Files;
          this.setState({
            ...this.state,
            slides: res.data.FrontPageName.Files,
          });
        }
      })
      .catch(error => {});
  }

  _renderItem = item => {
    const imageUrl = item.item.FileUri.toString();
    return (
      <View style={initialAppStyle.slide1}>
        <StatusBar backgroundColor={item.item.Style} />
        <Image source={{uri: imageUrl}} style={{height: '100%'}} />
        <Text>{item.text}</Text>
      </View>
    );
  };

  _onDone = () => {
    this.props.setUserIsFirstTimeRunning(true);
    this.props.navigation.replace('MainPage');
  };

  render() {
    if (this.props.rehydrated == false) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      if (this.props.user.isFirstTimeRunning === false) {
        return (
          <AppIntroSlider
            renderItem={this._renderItem}
            slides={slidesconst}
            onDone={this._onDone}
          />
        );
      } else {
        return <Main {...this.props} />;
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    rehydrated: state.rehydrated,
  };
};

const mapDispatchToProps = dispath => {
  return {
    setUserIsFirstTimeRunning: isLogged => {
      dispath(setUserRunning(isLogged));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppIntro);
