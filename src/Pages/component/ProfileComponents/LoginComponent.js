import React from 'react';
import {Input,Button,Overlay} from 'react-native-elements';
import {Image,View,ActivityIndicator,Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

class LoginComponent extends React.Component{
    constructor(props){
        super(props);
        this._LoginEvent = this._LoginEvent.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    state ={
        loadingModal:false,
        isDisabeBtnLogin:true,
        userData:{
            Email:'',
            Password:''
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

    handleChangeEmail=(e)=>{
        this.setState({
            ...this.state,
            loadingModal:true
        });
        // alert(this.state.userData.Email);
       this.disableBtnLogin();
       
    }

     handleChangePassword=(e)=>{
        this.setState({
            ...this.state,
            userData:{
                Password:e
            }
        });

        // alert(this.state.userData.Password);
        this.disableBtnLogin();
    }

    disableBtnLogin(){

        if(this.state.userData.Email!=""&&this.state.userData.Password!=""){
            this.setState({
                ...this.state,
                isDisabeBtnLogin:false
            })
        }else{
            this.setState({
                ...this.state,
                isDisabeBtnLogin:true
            })
        }
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
                            <Input leftIcon={this.renderIcon('ios-mail')} placeholder='Email' onChangeText={this.handleChangeEmail}></Input>
                            <Input leftIcon={this.renderIcon('ios-key')} placeholder='Password' onChangeText={this.handleChangePassword}></Input>
                        </View>
                        <View style={{marginTop:10,flex:1,alignItems:'center'}}>
                          <Button  onPress={this._LoginEvent} disabled={this.state.isDisabeBtnLogin} title="SignIn"  buttonStyle={{width:250}} type="outline" ></Button>
                        </View>
                        <Overlay height={40} width={40}  overlayStyle={{opacity: 0.4, shadowOpacity: 1}} windowBackgroundColor="rgba(255, 255, 255, .5)" isVisible={this.state.loadingModal}>
                            <ActivityIndicator height={100} width={100}></ActivityIndicator>
                        </Overlay>
                    </View>
                     
        )
    }
}
export default LoginComponent;
