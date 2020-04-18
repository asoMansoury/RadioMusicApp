/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {platformWidth,UIName,UIPlatForm,TLID} from './../../../CommonFiles/ConstantData';
import LoginComponent from './../../component/ProfileComponents/LoginComponent';
import RegisterComponent from './../../component/ProfileComponents/RegisterComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TabView, TabBar} from 'react-native-tab-view';
import MusicProfile from './MusicProfile';
import {connect} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import {DropDownHolder} from './../../component/DropDownHolder';
import commonUtility from './../../../CommonFiles/commonUtility';
import axios from 'axios';
import {isUserLogged, setPageLanguage,filterElementsLanguage,setDefaultAppLanguage} from '../../Redux/Actions/index';
import {FloatingAction} from 'react-native-floating-action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  mainColor,
  BaseApiUrl,
  SignInKey,
  SignUpKey,
} from './../../../CommonFiles/ConstantData';

const initialLayout = {
  height: 0,
  width: platformWidth,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.showDropDownAlert = this.showDropDownAlert.bind(this);
    this._loadText = this._loadText.bind(this);
  }
  state = {
    actions:[],
    language:[],
    isShowDropDown: false,
    index: 0,
    routes: [
      {key: 'SignIn', title: commonUtility.getElementTitle('SignIn')},
      {key: 'SignUp', title: commonUtility.getElementTitle('SignUp')},
    ],
  };
  componentDidUpdate() {}
  componentWillMount() {
    // this.props.setPageLanguage(TLID.English);
    axios.get(BaseApiUrl + '/LanguageApi/GetLanguages').then(res => {
      if (res.data.isError === true){
      } else {
          var languages = [];
          res.data.TLanguages.map((item,index)=>{
            languages.push({
              text:item.Language,
              name:item.LanguageCode,
              position:index,
              color:'#00796b',
              icon: <Ionicons color="#FFFFFF" name="ios-mail" size={18} />,
            });
          });
          this.setState({
            ...this.state,
            actions:languages,
          });
      }
    });

    this._loadText(this.props.configApp.TLID);
  }

  _loadText = TlID => {
    var data = {
      TLanguageID: TlID,
      Key: UIName.Profile,
      PlatformType: UIPlatForm.MobileApplication,
    };
    commonUtility.setUIErrorMessages(data.TLanguageID);
    axios.post(BaseApiUrl + '/FrontEndApi/inqueryPage', data).then(res => {
      if (res.data.isError === true) {
      } else {
        this.props.setPageLanguage(res.data.FronEndPages);
        this.setState({
          ...this.state,
          routes: [
            {key: 'SignIn', title: commonUtility.getElementTitle('SignIn')},
            {key: 'SignUp', title: commonUtility.getElementTitle('SignUp')},
          ],
        });
      }
    });
  };
  showDropDownAlert(errorType, errorTitle, errorMessage) {
    DropDownHolder.showAlert(errorType, errorTitle, errorMessage);
  }

  _handleIndexChange = index => this.setState({index});

  _renderScene = ({route}) => {
    switch (route.key) {
      case SignInKey.toString():
        return (
          <LoginComponent
            screenProps={this.props}
            showDropDownAlert={this.showDropDownAlert}
          />
        );
      case SignUpKey.toString():
        return (
          <KeyboardAwareScrollView>
            <RegisterComponent
              screenProps={this.props}
              showDropDownAlert={this.showDropDownAlert}
            />
          </KeyboardAwareScrollView>
        );
      default:
        return null;
    }
  };

  renderTabBar = props => (
    <TabBar {...props} style={{backgroundColor: '#388E3C'}} />
  );
  render() {
    if (this.props.user.isUserLogged === false) {
      return (
        <View
          style={styles.container}
          showDropDownAlert={this.showDropDownAlert}>
          <TabView
            swipeEnabled={true}
            navigationState={this.state}
            renderTabBar={this.renderTabBar}
            renderScene={this._renderScene}
            onIndexChange={this._handleIndexChange}
            initialLayout={initialLayout}
          />
          <DropdownAlert
            ref={ref => DropDownHolder.setDropDown(ref)}
            closeInterval={2000}
            zIndex={10000}
          />
        <FloatingAction ref={(ref) => { this.floatingAction = ref; }}
            actions={this.state.actions}
            color="#00796b"
            onPressItem={name=>{
              this.props.setDefaultAppLanguage(name);
              this._loadText(name);
            }} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <MusicProfile screenProps={this.props} />
        </View>
      );
    }
  }
}

const mapstatesToProps = state => {
  return {
    user: state.user,
    isValidEmail: state.commonreducer.isValidEmail,
    isMobileValidate: state.commonreducer.isValidMobile,
    isUserLogged: state.user.isUserLogged,
    configApp: state.configApp,
  };
};

const mapDispatchToProps = dispath => {
  return {
    checkIsEmailValidate: email => {
      dispath(checkEmailValidate(email));
    },
    checkIsMobileValidate: mobile => {
      dispath(checkMobileValide(mobile));
    },
    setUserLogging: value => {
      dispath(isUserLogged(value));
    },
    setPageLanguage: value => {
      dispath(setPageLanguage(value));
    },
    filterElementsLanguage:value=>{
      dispath(filterElementsLanguage(value));
    },
    setDefaultAppLanguage:value=>{
      dispath(setDefaultAppLanguage(value));
    },
  };
};

export default connect(
  mapstatesToProps,
  mapDispatchToProps,
)(Profile);
