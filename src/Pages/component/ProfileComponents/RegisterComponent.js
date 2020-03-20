
import React from 'react';
import {Input,Button,Text} from 'react-native-elements';
import {StyleSheet,View,Image,ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {checkEmailValidate,checkMobileValide,isUserLogged} from '../../Redux/Actions/index';
import {BaseApiUrl} from './../../../CommonFiles/ConstantData';
import {DropDownHolder} from './../../component/DropDownHolder';
import DropdownAlert from 'react-native-dropdownalert';
import SpinnerButton from 'react-native-spinner-button';
import axios from 'axios';
import { connect } from 'react-redux';
import {Validation} from './../../../CommonFiles/Validation';

class RegisterComponent extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            userData:{
                Mobile:'+98',
                Password:'',
                ConfirmPassword:'',
                Email:'',
                UserName:''
            },
            isDisabeSignUpBtn:true,
            isValidPassword:false,
            isShowRegisterLoadinLoading:false,
            isExistUserName:false
        }
        this.handleConfirmPassTXT = this.handleConfirmPassTXT.bind(this);
        this.handleEmailTxt = this.handleEmailTxt.bind(this);
        this.handleMobileTxt = this.handleMobileTxt.bind(this);
        this.handlePasswordTxt = this.handlePasswordTxt.bind(this);
        this.disableSignUpBtn = this.disableSignUpBtn.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.CheckUserName = this.CheckUserName.bind(this);
    }

    componentDidUpdate(){
        // this.props.showDropDownAlert('error','خطا','hh');
    }

    disableSignUpBtn(){
        const {Email,Password,ConfirmPassword,Mobile}  = this.state.userData;
        if(Email!=""&&Password!=""&&ConfirmPassword&&Mobile){
            if(Validation.validEmail(Email)==true&&Validation.checkMobile(Mobile)==true&&Validation.checkPassword(Password,ConfirmPassword)==true)
            {
                this.setState({
                    ...this.state,
                    isDisabeSignUpBtn:false
                });
            }
            else{
                this.setState({
                    ...this.state,
                    isDisabeSignUpBtn:true
                });
            }
        }else{
            this.setState({
                ...this.state,
                isDisabeSignUpBtn:true
            });
        }
    }

    handleConfirmPassTXT(value){
        this.setState({
            ...this.state,
            userData:{
                ...this.state.userData,
                ConfirmPassword:value
            }
        },this.disableSignUpBtn);
    }

    handlePasswordTxt(value){
        this.setState({
            ...this.state,
            userData:{
                ...this.state.userData,
                Password:value
            }
        },this.disableSignUpBtn);
    }

    handleEmailTxt(value){
        this.setState({
            ...this.state,
            userData:{
                ...this.state.userData,
                Email:value
            }
        },this.disableSignUpBtn);
    }

    handleMobileTxt(value){
        
        this.setState({
            ...this.state,
            userData:{
                ...this.state.userData,
                Mobile:value
            }
        },this.disableSignUpBtn);

    }

    handleUserName(value){
        this.setState({
            ...this.state,
            userData:{
                ...this.state.userData,
                UserName:value
            }
        });
    }

    RegisterEvent=()=>{
        var data = {
            email: this.state.userData.Email,
            password: this.state.userData.Password,
            Mobile:this.state.userData.Mobile,
            userName:this.state.userData.UserName
        };
        this.setState({
            ...this.state,
            isShowRegisterLoadinLoading:true
        })
            axios.post(BaseApiUrl+"/UserApi/RegisterUserFromMobile",data).then(res => {
                 this.setState({
                    ...this.state,
                    isShowRegisterLoadinLoading:false
                });
            if(res.data.isError==true){
                  this.props.showDropDownAlert('error','خطا',res.data.Errors.Message);
                  this.props.setUserLogging(false);
            }else{
                this.props.showDropDownAlert('success','خطا','عملیات با موفقیت انجام گردید');
                this.props.setUserLogging(true);
                const userInformation={
                    mobile:data.Mobile,
                    userName:data.userName,
                    email:data.email
                }
                this.props.saveUserInformation(userInformation);
            }
          });
    }

    CheckUserName=()=>{
        var data = {
            userName:this.state.userData.UserName
        }
        axios.post(BaseApiUrl+"/UserApi/CheckUserName",data).then(res => {
            if(res.data.isError==true)
                this.props.showDropDownAlert('error','خطا',res.data.Errors.Message);
            else{
                if(res.data.isUserNameExist==true){
                    this.setState({
                        ...this.state,
                        isExistUserName:true
                    });
                    this.props.showDropDownAlert('info','اطلاع',res.data.isUserNameExistMessage);
                }else{
                    this.setState({
                        ...this.state,
                        isExistUserName:false
                    });
                    this.props.showDropDownAlert('success','موفق',res.data.isUserNameExistMessage);
                }

            }

          });
    }
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
                            <Input leftIcon={this.renderIcon('ios-call')} placeholder='Mobile' value={this.state.userData.Mobile} onChangeText={this.handleMobileTxt}></Input>
                            <Input leftIcon={this.renderIcon('ios-mail')} placeholder='UserName' value={this.state.userData.UserName} onBlur={this.CheckUserName} onChangeText={this.handleUserName}></Input>
                            <Input leftIcon={this.renderIcon('ios-key')} placeholder='Password' value={this.state.userData.Password} onChangeText={this.handlePasswordTxt}></Input>
                            <Input leftIcon={this.renderIcon('ios-key')} placeholder='Confirm Password' value={this.state.userData.ConfirmPassword} onChangeText={this.handleConfirmPassTXT}></Input>
                            <Input leftIcon={this.renderIcon('ios-mail')} placeholder='Email' value={this.state.userData.Email} onChangeText={this.handleEmailTxt}></Input>
                    </View>

                    <View style={{marginTop:10,flex:1,alignItems:'center'}}>
                        {/* <Button disabled={this.state.isDisabeSignUpBtn} title="SignUp" onPress={}  buttonStyle={{width:250}} type="outline"></Button> */}
                        <View style={{marginTop:20,height:50,width:'80%'}}>
                        <SpinnerButton disabled={this.state.isDisabeSignUpBtn} isLoading={this.state.isShowRegisterLoadinLoading} spinnerType='BarIndicator'  onPress={this.RegisterEvent} buttonStyle={{
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    width:'100%',
                                                                    borderRadius:5,
                                                                    height: 50,
                                                                    backgroundColor: '#25CAC6',
                                                                }}  indicatorCount={10}>
                            <Text>Register</Text>
                        </SpinnerButton>
                    </View>
                    </View>
                </View>                 
        )
    }
}


const mapstatesToProps =(state)=>{
    return {
        isUserLogged:state.user.isUserLogged,
        userInformation:state.user.userInformation
    }
}

const mapDispatchToProps = dispath =>{
  return{
    setUserLogging:value=>{
        dispath(isUserLogged(value))
    },
    saveUserInformation:value=>{
        dispath(saveUserInformation(value))
    }

  }
}

export default connect(mapstatesToProps,mapDispatchToProps)(RegisterComponent);

