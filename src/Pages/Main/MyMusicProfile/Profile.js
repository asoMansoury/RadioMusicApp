import React, {Component} from 'react';
import {ActivityIndicator,View,StyleSheet,TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import {Image} from 'react-native-elements';
import LoginComponent from './../../component/ProfileComponents/LoginComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
    

    render(){
        return(
            <View style={styles.container}>
                <View style={{minHeight:'35%'}}>
                    <Image style={styles.logo} PlaceholderContent={<ActivityIndicator></ActivityIndicator>}  
                           source={{uri:'https://roocket.ir/public/images/2017/8/9/React-native_Banner2.png'}}></Image>
                </View>
                <KeyboardAwareScrollView style={{flex:1}}
                    scrollEnabled={true}
                >
                    <View style={{flex:1}}>
                        <LoginComponent></LoginComponent>
                    </View>
                </KeyboardAwareScrollView>

                

                
            </View>
            
        )
    }
}