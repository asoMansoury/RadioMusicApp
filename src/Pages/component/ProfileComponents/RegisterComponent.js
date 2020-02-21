
import React from 'react';
import {Input,Button} from 'react-native-elements';
import {StyleSheet,View,Image,ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class RegisterComponent extends React.Component{

    renderIcon = icon =>()=>(
        <Ionicons name={icon} size={24}  ></Ionicons>
    )

    render(){
        return(
                <View  style={{flext:1,flexDirection:'column'}}>
                    <View style={{height:200}}>
                            <Image 
                                style={{height:200}}
                                placeholder={<ActivityIndicator></ActivityIndicator>}
                                source={{uri:'https://roocket.ir/public/images/2018/4/10/nodejs-2.png'}}></Image>
                    </View>
                    <View>
                            <Input leftIcon={this.renderIcon('ios-person')} placeholder='UserName'></Input>
                            <Input leftIcon={this.renderIcon('ios-key')} placeholder='Password'></Input>
                            <Input leftIcon={this.renderIcon('ios-key')} placeholder='Confirm Password'></Input>
                            <Input leftIcon={this.renderIcon('ios-mail')} placeholder='Email'></Input>
                    </View>
                    <View style={{marginTop:10,flex:1,alignItems:'center'}}>
                        <Button title="SignUp"  buttonStyle={{width:250}} type="outline"></Button>
                    </View>
                </View>                 
        )
    }
}
export default RegisterComponent;

