import React, {Component} from 'react';
import {ActivityIndicator,View,StyleSheet,TouchableOpacity,KeyboardAvoidingView, Dimensions } from 'react-native';
import {Image} from 'react-native-elements';
import LoginComponent from './../../component/ProfileComponents/LoginComponent';
import RegisterComponent from './../../component/ProfileComponents/RegisterComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TabView,TabBar,SceneMap} from 'react-native-tab-view';

const initialLayout = {
    height:0,
    width:Dimensions.get('window').width
}

const FirstRoute = () => <View style={[ styles.container, { backgroundColor: '#ff4081' } ]} />;
const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7' } ]} />;

const styles = StyleSheet.create({
    container:{
        flex:1,flexDirection:'column',
        justifyContent:'flex-end',
        backgroundColor: '#2c3e50'
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
          { key: 'first', title: 'First' },
          { key: 'second', title: 'Second' },
        ],
      };
    
      _handleIndexChange = index => this.setState({ index });
    
      _renderHeader = props => <TabBar {...props} />;
    
      _renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      });

    render(){
        return(
            <View style={styles.container}>
                <View style={{minHeight:'35%'}}>
                    <Image style={styles.logo} PlaceholderContent={<ActivityIndicator></ActivityIndicator>}  
                           source={{uri:'https://roocket.ir/public/images/2017/8/9/React-native_Banner2.png'}}></Image>
                </View>
                {/* <KeyboardAwareScrollView style={{flex:1}}
                    scrollEnabled={false}
                    
                    resetScrollToCoords={{x:0,y:0}}
                >
                    <View style={{flex:1}}>
                        <LoginComponent></LoginComponent>
                    </View>
                </KeyboardAwareScrollView> */}

    <TabView
        swipeEnabled={true}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />

                

                
            </View>
            
        )
    }
}