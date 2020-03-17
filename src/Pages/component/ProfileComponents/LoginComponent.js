import React from 'react';
import {Input,Button,Overlay} from 'react-native-elements';
import {Image,View,ActivityIndicator,Text,Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { connect } from 'react-redux';
import {checkEmailValidate,checkMobileValide} from '../../Redux/Actions/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import VerificationCodeComponent from './ForgotPasswordComponent/VerificationCodeComponent';
import {BaseApiUrl} from './../../../CommonFiles/ConstantData';
import { Easing } from 'react-native-reanimated';
import {DropDownHolder} from './../../component/DropDownHolder';
import DropdownAlert from 'react-native-dropdownalert';

class LoginComponent extends React.Component{
    constructor(props){
        super(props);
        this._LoginEvent = this._LoginEvent.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.disableBtnLogin = this.disableBtnLogin.bind(this);
        this.handleChangeForgotMobile =this.handleChangeForgotMobile.bind(this);
        this.handleChangeForgotVerficationCode = this.handleChangeForgotVerficationCode.bind(this);
        
        this.state ={
            loadingModal:false,
            isDisabeBtnLogin:true,
            loadingModalForgotPassword:false,
            isSendVerificationCode:true,
            isShowCheckCode:false,
            isShowResetPassword:false,
            isSendCodeClicked:false,
            forgotPasswordData:{
                MobileForSendCode:"+98",
                verficationCode:''
            },
            userData:{
                Email:'',
                Password:''
            }
        }
        this.btnSendCodeAnimation= new Animated.Value(300);
    }

    componentDidUpdate(){
        this.dropDownAlertRef = DropDownHolder.getDropDown();
        
    }

    initiAnimation(isClicked){
        
        if(isClicked==true){
            this.btnSendCodeAnimation.setValue(300);
            Animated.timing(this.btnSendCodeAnimation,{
                toValue:150,
                duration:800,
                easing:Easing.linear
            }).start();
        }else{
            this.btnSendCodeAnimation.setValue(150);
            Animated.timing(this.btnSendCodeAnimation,{
                toValue:300,
                duration:3000,
                easing:Easing.linear
            }).start();
        }

    }

    renderIcon = icon =>()=>(
        <Ionicons name={icon} size={24}  ></Ionicons>
    )

    _LoginEvent=()=>{
        axios.post(BaseApiUrl+"/api/userapi/Login",{
            headers: {
                'Content-Type': 'application/json',
            },
            userName: 'aso',
            password: '12345'
        }).then(res => {
            this.setState({
                ...this.state,
                loadingModal:false
            });
          });
    }

    _forgotPasswordEvent=()=>{
        this.setState({
            ...this.state,
            loadingModalForgotPassword:true
        })
    }

    _sendVerificationCode=()=>{
        try {

        this.props.checkIsMobileValidate(this.state.forgotPasswordData.MobileForSendCode);
        if(this.props.isMobileValidate){
            this.setState({
                ...this.state,
                isSendCodeClicked:true,
            });
            this.initiAnimation(true);
            axios.get(BaseApiUrl+"/MessageApi/SendVerificationCode?callNumber="+this.state.forgotPasswordData.MobileForSendCode)
            .then(res => {
                this.initiAnimation(false);
                if(res.data.isError==true){
                    DropDownHolder.showAlert('error','خطا',res.data.Errors.Message);
                }else{
                    DropDownHolder.showAlert('success','ارسال','کد ارسال گردید.');
                    this.setState({
                        ...this.state,
                        isSendVerificationCode:false,
                        isShowCheckCode:true,
                        isShowResetPassword:false,
                        isSendCodeClicked:false
                    });
                }
              });
        }else{
            DropDownHolder.showAlert('warn','فرمت','لطفا شماره موبایل را بدرستی وارد نمایید.');
        }
                    
        } catch (error) {
            DropDownHolder.showAlert('error','فرمت',error);
        }
    }

    _CheckCode=()=>{

        try {
            if(this.state.forgotPasswordData.verficationCode!=''){
                var data = {
                    callNumber: this.state.forgotPasswordData.MobileForSendCode.toString(),
                    confirmationCode: this.state.forgotPasswordData.verficationCode.toString()
                };
                console.log("data",data);
                axios.post(BaseApiUrl+"/MessageApi/ConfirmVerificationCode",data)
                .then(res => {
                    if(res.data.isError==true){
                        DropDownHolder.showAlert('error','خطا',res.data.Errors.Message);
                    }else{
                        DropDownHolder.showAlert('success','اعلامیه',res.data.Errors.Message);
                        this.setState({
                            ...this.state,
                            isSendVerificationCode:false,
                            isShowCheckCode:false,
                            isShowResetPassword:true
                        })
                    }
                    }).catch(error=>console.log(error));
                }else{
                    DropDownHolder.showAlert('error','فرمت','data');
                }                  
            } catch (error) {
                DropDownHolder.showAlert('error','فرمت',error);
            }
    }

    _ResendCode=()=>{
        this.setState({
            ...this.state,
            isSendVerificationCode:true,
            isShowCheckCode:false,
            isShowResetPassword:false
        })
    }

      handleChangeEmail(email){
        this.setState((prevState)=>{
            return{
                loadingModal:false,
                userData:{
                    Email:email,
                    Password:prevState.userData.Password
                }
            }
        },this.disableBtnLogin);
    }

    handleChangeForgotMobile(mobile){
        this.setState({
            ...this.state,
            forgotPasswordData:{
                verficationCode:this.state.forgotPasswordData.verficationCode,
                MobileForSendCode:mobile
            }
        })
    }

    handleChangeForgotVerficationCode(code){
        this.setState({
            ...this.state,
            forgotPasswordData:{
                verficationCode:code,
                MobileForSendCode:this.state.forgotPasswordData.MobileForSendCode
            }
        })
    }

     handleChangePassword=(e)=>{
         this.setState((prevState)=>{
            return{
                loadingModal:false,
                userData:{
                    Email:prevState.userData.Email,
                    Password:e
                }
            }
        },this.disableBtnLogin);
    }

    disableBtnLogin(){
        if(this.state.userData.Email!=""&&this.state.userData.Password!=""){
            this.props.checkIsEmailValidate(this.state.userData.Email);
            if(this.props.isValidEmail===true){
                this.setState({
                    ...this.state,
                    isDisabeBtnLogin:false
                });
            }else{
                this.setState({
                    ...this.state,
                    isDisabeBtnLogin:true
                });
            }

        }else{
            this.setState({
                ...this.state,
                isDisabeBtnLogin:true
            });
        }
    }

    validateEmaail() {
        

    }

    
    

    render(){
        const btnSendCodeWidth = this.btnSendCodeAnimation;
        return(
            <KeyboardAwareScrollView>
                    <View style={{flext:1,flexDirection:'column'}}>
                        <View style={{height:200}}>
                                <Image 
                                    style={{height:200}}
                                    placeholder={<ActivityIndicator></ActivityIndicator>}
                                    source={{uri:'https://roocket.ir/public/images/2018/4/10/nodejs-2.png'}}></Image>
                        </View>
                        <View>
                            <Input leftIcon={this.renderIcon('ios-mail')} placeholder='Email' onChangeText={this.handleChangeEmail}></Input>
                            <Input leftIcon={this.renderIcon('ios-key')} placeholder='Password' onChangeText={this.handleChangePassword.bind(this)}></Input>
                        </View>
                        <View style={{marginTop:10,flex:1,alignItems:'center'}}>
                          <Button  onPress={this._LoginEvent} disabled={this.state.isDisabeBtnLogin} title="SignIn"  buttonStyle={{width:250}} type="outline" ></Button>
                          <Button title="Forgot Password" type='clear' onPress={this._forgotPasswordEvent} buttonStyle={{width:400}}></Button>
                        </View>

                        <Overlay height={40} width={40}  overlayStyle={{opacity: 0.4, shadowOpacity: 1}} windowBackgroundColor="rgba(255, 255, 255, .5)" isVisible={this.state.loadingModal}>
                            <ActivityIndicator height={100} width={100}></ActivityIndicator>
                        </Overlay>

                        <Overlay containerStyle={{margin:0,padding:0}} borderRadius={3}  animationType='fade' onBackdropPress={()=>{this.setState({
                                        ...this.state,
                                        isSendCodeClicked:false,
                                        loadingModalForgotPassword:false,
                                        isSendVerificationCode:true,
                                        isShowCheckCode:false,
                                        isShowResetPassword:false
                                    });this.initiAnimation()}} height={'50%'} width={'90%'}  overlayStyle={{opacity: 1, shadowOpacity: 1}} windowBackgroundColor="rgba(255, 255, 255, .5)" isVisible={this.state.loadingModalForgotPassword}>
                            <View style={{flex:1,flexDirection:'column',margin:-10,padding:0}}>
                                <View style={{backgroundColor:'green',height:'30%',borderRadius:3}}><Text>hello</Text></View>


                                <VerificationCodeComponent hide={this.state.isSendVerificationCode}>
                                     <Input leftIcon={this.renderIcon('ios-call')} placeholder='Mobile' onChangeText={this.handleChangeForgotMobile} value={this.state.forgotPasswordData.MobileForSendCode}></Input>
                                     <Animated.View style={{marginTop:20,width:btnSendCodeWidth}}>
                                        <Button onPress={this._sendVerificationCode} title="Send Code" type='clear' buttonStyle={{width:'100%',justifyContent:'center'}} type='outline'></Button>
                                    </Animated.View>
                                </VerificationCodeComponent>

                                <VerificationCodeComponent hide={this.state.isShowCheckCode}>
                                        <Text>Timer</Text>
                                        <Input leftIcon={this.renderIcon('ios-call')} placeholder='Verification Code' onChangeText={this.handleChangeForgotVerficationCode}></Input>
                                        <Button title="Check Code" onPress={this._CheckCode}  buttonStyle={{width:200,marginTop:5,justifyContent:'center'}} type='outline'></Button>
                                        <Button title="Resend" onPress={this._ResendCode} type="clear" buttonStyle={{width:200,marginTop:5,justifyContent:'center'}}></Button>
                                </VerificationCodeComponent>

                                
                                <VerificationCodeComponent hide={this.state.isShowResetPassword}>
                                        <Input></Input>
                                        <Button title="Reset Password"  buttonStyle={{width:200,marginTop:5,justifyContent:'center'}} type='outline'></Button>
                                </VerificationCodeComponent>
                            </View>
                            <DropdownAlert ref={ref => DropDownHolder.setDropDown(ref)} closeInterval={2} zIndex={10000} /> 
                        </Overlay>
                                                    
                    </View>
                    
            </KeyboardAwareScrollView>  
        )
    }
}


  const mapStateToProps = (state)=>{
    return {
        isValidEmail:state.commonreducer.isValidEmail,
        isMobileValidate:state.commonreducer.isValidMobile
    }
}

  const mapDispatchToProps = dispath =>{
    return{
      checkIsEmailValidate:email =>{
        dispath(checkEmailValidate(email))
      },
      checkIsMobileValidate:mobile =>{
          dispath(checkMobileValide(mobile))
      }
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent);
