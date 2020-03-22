/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import LoginComponent from './../../component/ProfileComponents/LoginComponent';
import RegisterComponent from './../../component/ProfileComponents/RegisterComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import MusicProfile from './MusicProfile';
import {connect} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import {DropDownHolder} from './../../component/DropDownHolder';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  loginContainer: {},
  logo: {
    position: 'relative',
    width: '100%',
    minHeight: 200,
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.showDropDownAlert = this.showDropDownAlert.bind(this);
  }
  state = {
    isShowDropDown: false,
    index: 0,
    routes: [
      {key: 'SignIn', title: 'SignIn'},
      {key: 'SignUp', title: 'SignUp'},
    ],
  };
  componentDidUpdate() {}

  showDropDownAlert(errorType, errorTitle, errorMessage) {
    DropDownHolder.showAlert(errorType, errorTitle, errorMessage);
  }

  _handleIndexChange = index => this.setState({index});
  _renderHeader = props => <View {...props} />;

  _renderScene = ({route}) => {
    switch (route.key) {
      case 'SignIn':
        return <LoginComponent showDropDownAlert={this.showDropDownAlert} />;
      case 'SignUp':
        return (
          <KeyboardAwareScrollView>
            <RegisterComponent showDropDownAlert={this.showDropDownAlert} />
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
    if (this.props.user.isUserLogged == false) {
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
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <MusicProfile />
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
  };
};

export default connect(
  mapstatesToProps,
  mapDispatchToProps,
)(Profile);
