import React from 'react';
import {Input,Button} from 'react-native-elements';
import {Image,View,ActivityIndicator,TouchableHighlight} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
class LoginComponent extends React.Component{

    renderIcon = icon =>()=>(
        <Ionicons name={icon} size={24}  ></Ionicons>
    )

    _LoginEvent=()=>{
        alert("OK");
    }

    render(){
        return(
                    <View style={{flext:1,flexDirection:'column'}}>
                    <View style={{height:200}}>
                            <Image 
                                style={{height:200}}
                                placeholder={<ActivityIndicator></ActivityIndicator>}
                                source={{uri:'https://roocket.ir/public/images/2018/4/10/nodejs-2.png'}}></Image>
                    </View>
                        <View>
                            <Input leftIcon={this.renderIcon('ios-mail')} placeholder='Email'></Input>
                            <Input leftIcon={this.renderIcon('ios-key')} placeholder='Password'></Input>
                        </View>
                        <View style={{marginTop:10,flex:1,alignItems:'center'}}>
                          <Button onPress={this._LoginEvent} title="SignIn"  buttonStyle={{width:250}} type="outline" ></Button>
                        </View>
                    </View>
                     
        )
    }
}
export default LoginComponent;
