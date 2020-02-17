import React, {Component} from 'react';
import {ActivityIndicator,View,StyleSheet,TouchableOpacity, Dimensions } from 'react-native';
import LoginComponent from './../../component/ProfileComponents/LoginComponent';
import RegisterComponent from './../../component/ProfileComponents/RegisterComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TabView,TabBar,SceneMap} from 'react-native-tab-view';

const initialLayout = {
    height:0,
    width:Dimensions.get('window').width
}

const FirstRoute = () => <KeyboardAwareScrollView ><LoginComponent /></KeyboardAwareScrollView>;
const SecondRoute = () => <KeyboardAwareScrollView>
    <RegisterComponent /></KeyboardAwareScrollView>;

const styles = StyleSheet.create({
    container:{
        flex:1,flexDirection:'column',
        justifyContent:'flex-end',
        backgroundColor: '#c51162'
    },
    loginContainer:{
        
    },
    logo:{
        position:'relative',
        width:'100%',
        minHeight:200
    }
})

export default class Profile extends Component{
    state = {
        index: 0,
        routes: [
          { key: 'SignIn', title: 'SignIn' },
          { key: 'SignUp', title: 'SignUp' },
        ],
      };
    
      _handleIndexChange = index => this.setState({ index });
    
      _renderHeader = props => <View  {...props} />;
    
      _renderScene = SceneMap({
        SignIn: FirstRoute,
        SignUp: SecondRoute,
      });

     renderTabBar = props => (
        <TabBar
          {...props}
          
          style={{ backgroundColor: '#388E3C' }}
        />
      );
    render(){
        return(
            <View style={styles.container}>
                <TabView
                    swipeEnabled={true}
                    navigationState={this.state}
                    renderTabBar={this.renderTabBar}
                    renderScene={this._renderScene}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={initialLayout}
                />    
            </View>
            
        )
    }
}