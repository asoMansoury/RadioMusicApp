import React from 'react';
import {Input,Button,Overlay} from 'react-native-elements';
import {Image,View,ActivityIndicator,Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

class LoginComponent extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            loadingModal:false
        }
    }
    renderIcon = icon =>()=>(
        <Ionicons name={icon} size={24}  ></Ionicons>
    )

    _LoginEvent=()=>{
        this.setState({
            ...this.state,
            loadingModal:true
        });
        axios.post("http://192.168.164.2:53094//api/userapi/Login",{
            userName: 'aso',
            password: '12345'
        }).then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({
                ...this.state,
                loadingModal:false
            });
          });
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
                        <Overlay height={40} width={40}  overlayStyle={{opacity: 0.4, shadowOpacity: 1}} windowBackgroundColor="rgba(255, 255, 255, .5)" isVisible={this.state.loadingModal}>
                            <ActivityIndicator height={100} width={100}></ActivityIndicator>
                        </Overlay>
                    </View>
                     
        )
    }
}
export default LoginComponent;
