/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import BottomNavigation, {
  FullTab,
} from 'react-native-material-bottom-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Browse from './Browse/Browse';
import Playlists from './Playlists/Playlists';
import Search from './Search/Search';
import Home from './Home/Home';
import Profile from './MyMusicProfile/Profile';
import {connect} from 'react-redux';
import {
  NAV_BAR_HEIGHT,
  STATUS_BAR_HEIGHT,
  HEADER_HEIGHT,
  IS_IPHONE_X,
} from './../../CommonFiles/ConstantData';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  tabs = [
    {
      key: 'Home',
      icon: 'ios-home',
      label: 'Home',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'Browse',
      icon: 'ios-browsers',
      label: 'Browse',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'Search',
      icon: 'ios-search',
      label: 'Search',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'Playlists',
      icon: 'ios-list-box',
      label: 'Playlists',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'MusicProfile',
      icon: 'ios-person',
      label: 'Profile',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
  ];
  state = {
    activeTab: 'MusicProfile',
  };
  renderIcon = icon => ({isActive}) => (
    <Ionicons
      name={icon}
      size={24}
      style={isActive === true ? {color: 'white'} : {color: 'black'}}
    />
  );

  renderTab = ({tab, isActive}) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  );

  componentDidUpdate() {}

  renderView() {}

  render() {
    if (this.state.activeTab === 'MusicProfile') {
      return (
        <View style={{flex: 1}}>
          <View
            style={
              IS_IPHONE_X && this.props.user.isUserLogged == true
                ? {height: STATUS_BAR_HEIGHT, backgroundColor: '#388E3C'}
                : {}
            }
          />
          <StatusBar backgroundColor="#388E3C" />
          <Profile screenProps={this.props.screenProps} />
          <BottomNavigation
            activeTab={this.state.activeTab}
            renderTab={this.renderTab}
            tabs={this.tabs}
            style={{borderTopColor: 'black'}}
            onTabPress={newTab => this.setState({activeTab: newTab.key})}
          />
        </View>
      );
    } else if (this.state.activeTab === 'Browse') {
      return (
        <View style={[{flex: 1}]}>
          <View
            style={
              IS_IPHONE_X
                ? {height: STATUS_BAR_HEIGHT, backgroundColor: '#388E3C'}
                : {}
            }
          />
          <StatusBar backgroundColor="#388E3C" />
          <Browse />
          <BottomNavigation
            activeTab={this.state.activeTab}
            renderTab={this.renderTab}
            tabs={this.tabs}
            onTabPress={newTab => this.setState({activeTab: newTab.key})}
          />
        </View>
      );
    } else if (this.state.activeTab === 'Playlists') {
      return (
        <View style={[{flex: 1}]}>
          <View
            style={
              IS_IPHONE_X
                ? {height: STATUS_BAR_HEIGHT, backgroundColor: '#388E3C'}
                : {}
            }
          />
          <StatusBar backgroundColor="#388E3C" />
          <Playlists />
          <BottomNavigation
            activeTab={this.state.activeTab}
            renderTab={this.renderTab}
            tabs={this.tabs}
            onTabPress={newTab => this.setState({activeTab: newTab.key})}
          />
        </View>
      );
    } else if (this.state.activeTab === 'Search') {
      return (
        <View style={[{flex: 1}]}>
          <View
            style={
              IS_IPHONE_X
                ? {height: STATUS_BAR_HEIGHT, backgroundColor: '#388E3C'}
                : {}
            }
          />
          <StatusBar backgroundColor="#388E3C" />
          <Search />
          <BottomNavigation
            activeTab={this.state.activeTab}
            renderTab={this.renderTab}
            tabs={this.tabs}
            onTabPress={newTab => this.setState({activeTab: newTab.key})}
          />
        </View>
      );
    } else if (this.state.activeTab === 'Home') {
      return (
        <View
          style={[
            {flex: 1},
            IS_IPHONE_X ? {marginTop: STATUS_BAR_HEIGHT} : {marginTop: 0},
          ]}>
          <View
            style={
              IS_IPHONE_X
                ? {height: STATUS_BAR_HEIGHT, backgroundColor: '#388E3C'}
                : {}
            }
          />
          <StatusBar backgroundColor="#388E3C" />
          <Home />
          <BottomNavigation
            activeTab={this.state.activeTab}
            renderTab={this.renderTab}
            tabs={this.tabs}
            onTabPress={newTab => this.setState({activeTab: newTab.key})}
          />
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
)(Main);
