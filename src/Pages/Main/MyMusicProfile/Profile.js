import React, {Component} from 'react';
import {ActivityIndicator,View,StyleSheet,TouchableOpacity, Dimensions } from 'react-native';
import LoginComponent from './../../component/ProfileComponents/LoginComponent';
import RegisterComponent from './../../component/ProfileComponents/RegisterComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TabView,TabBar,SceneMap} from 'react-native-tab-view';
import MusicProfile from './MusicProfile';
import {connect} from 'react-redux';

const initialLayout = {
    height:0,
    width:Dimensions.get('window').width
}

const FirstRoute = () => <KeyboardAwareScrollView ><LoginComponent /></KeyboardAwareScrollView>;
const SecondRoute = () => <KeyboardAwareScrollView><RegisterComponent /></KeyboardAwareScrollView>;

const styles = StyleSheet.create({
    container:{
        flex:1,flexDirection:'column',
        justifyContent:'flex-end',
        backgroundColor: '#fff'
    },
    loginContainer:{
        
    },
    logo:{
        position:'relative',
        width:'100%',
        minHeight:200
    }
})

class Profile extends Component{
    constructor(props){
        super(props);
    }

    
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
        if(this.props.user.isFirstTimeLogIn==true){
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
        }else{
            return(
                <View style={styles.container}>
                        <MusicProfile></MusicProfile>   
                </View>
                
            )
        }


    }
}

const mapstatesToProps =(state)=>{
    console.log(state);
    return {
        user:state.user
    }
}

export default connect(mapstatesToProps,null)(Profile);