import React from 'react';
import {Input} from 'react-native-elements';
import {StyleSheet,View,KeyboardAvoidingView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class LoginComponent extends React.Component{

    renderIcon = icon =>()=>(
        <Ionicons name={icon} size={24}  ></Ionicons>
    )

    render(){
        return(
                    <View >
                        <Input leftIcon={this.renderIcon('ios-person')} placeholder='Username'></Input>
                        <Input leftIcon={this.renderIcon('ios-mail')} placeholder='Password'></Input>
                        <Input leftIcon={this.renderIcon('ios-key')} placeholder='Email'></Input>
                        <View style={{ height: 60 }} />
                    </View>
                     
        )
    }
}
export default LoginComponent;
