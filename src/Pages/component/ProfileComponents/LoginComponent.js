/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Input, Button, Overlay} from 'react-native-elements';
import {Image, View, ActivityIndicator, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {
  initialAppStyle,
  animatedLoadinBtnConfig,
} from './../../../CommonFiles/Style';
import {connect} from 'react-redux';
import {saveUserInformation, isUserLogged} from '../../Redux/Actions/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import VerificationCodeComponent from './ForgotPasswordComponent/VerificationCodeComponent';
import {BaseApiUrl,UIErrorMessageCode,UIPlatForm} from './../../../CommonFiles/ConstantData';
import {DropDownHolder} from './../../component/DropDownHolder';
import DropdownAlert from 'react-native-dropdownalert';
import {Validation} from './../../../CommonFiles/Validation';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import commonUtility from './../../../CommonFiles/commonUtility';



class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this._LoginEvent = this._LoginEvent.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.disableBtnLogin = this.disableBtnLogin.bind(this);
    this.handleChangeForgotMobile = this.handleChangeForgotMobile.bind(this);
    this.handleChangeForgotVerficationCode = this.handleChangeForgotVerficationCode.bind(
      this,
    );
    this.handleChangeForgotResetPassword = this.handleChangeForgotResetPassword.bind(
      this,
    );
    this.state = {
      loadingModal: false,
      isDisabeBtnLogin: true,
      loadingModalForgotPassword: false,
      isSendVerificationCode: true,
      isShowCheckCode: false,
      isShowResetPassword: false,
      forgotPasswordData: {
        MobileForSendCode: '+98',
        verficationCode: '',
        NewPassword: '',
      },
      userData: {
        Email: '',
        Password: '',
      },
    };
  }


  componentDidUpdate() {}

  renderIcon = icon => () => <Ionicons color="#00E676" name={icon} size={24} />;

  _LoginEvent = () => {
    var data = {
      email: this.state.userData.Email,
      password: this.state.userData.Password,
      TLanguageCode:this.props.configApp.TLID,
    };
    this.loadingBtnSignIn.showLoading(true);
    axios.post(BaseApiUrl + '/UserApi/Login', data,
    {headers: { PlatformType: UIPlatForm.WebApplication, TLanguageCode:data.TLanguageCode}}).then(res => {
      this.loadingBtnSignIn.showLoading(false);
      if (res.data.isError === true) {
        this.props.showDropDownAlert('error', 'خطا', res.data.Errors.Message);
        this.props.setUserLogging(false);
      } else {
        this.props.showDropDownAlert(
          'success',
          'خطا',
          res.data.Errors.Message,
        );
        this.props.setUserLogging(true);
        const userInformation = {
          mobile: res.data.Mobile,
          userName: res.data.userName,
          email: res.data.email,
          token:res.data.PlatformToken,
        };
        this.props.saveUserInformation(userInformation);
      }
    }).catch(error => {
      this.props.showDropDownAlert('error', 'Error', error);
      this.loadingBtnChkCode.showLoading(false);
    });
  };

  _forgotPasswordEvent = () => {
    this.setState({
      ...this.state,
      loadingModalForgotPassword: true,
    });
  };

  _sendVerificationCode = () => {
    this.loadingBtnSend.showLoading(true);
    const {MobileForSendCode} = this.state.forgotPasswordData;
    if (Validation.checkMobile(MobileForSendCode)) {
      axios
        .get(
          BaseApiUrl +
            '/MessageApi/SendVerificationCode?callNumber=/' +
            this.state.forgotPasswordData.MobileForSendCode +
            '&TLID=' + this.props.configApp.TLID,
        )
        .then(res => {
          this.loadingBtnSend.showLoading(false);
          if (res.data.isError == true) {
            this.dropdown.alertWithType(
              'error',
              'Error',
              res.data.Errors.Message,
            );
          } else {
            this.dropdown.alertWithType('success', 'Error', res.data.Errors.Message);
            this.setState({
              ...this.state,
              isSendVerificationCode: false,
              isShowCheckCode: true,
              isShowResetPassword: false,
            });
          }
        })
        .catch(error => {
          this.dropdown.alertWithType('error', 'Error', error);
          this.loadingBtnSend.showLoading(false);
        });
    } else {
      this.loadingBtnSend.showLoading(false);
      this.dropdown.alertWithType(
        'error',
        'Error',
        commonUtility.getUIErrorMessagesByCode(UIErrorMessageCode.MobileFormat),
      );
    }
  };

  _CheckCode = () => {
    const {verficationCode, MobileForSendCode} = this.state.forgotPasswordData;
    if (verficationCode != '') {
      this.loadingBtnChkCode.showLoading(true);
      var data = {
        callNumber: MobileForSendCode,
        confirmationCode: verficationCode,
        TLID:this.props.configApp.TLID,
      };
      axios
        .post(BaseApiUrl + '/MessageApi/ConfirmVerificationCode', data)
        .then(res => {
          this.loadingBtnChkCode.showLoading(false);
          if (res.data.isError == true) {
            this.dropdown.alertWithType(
              'error',
              'خطا',
              res.data.Errors.Message,
            );
          } else {
            this.dropdown.alertWithType(
              'success',
              'اعلامیه',
              res.data.Errors.Message,
            );
            this.setState({
              ...this.state,
              isSendVerificationCode: false,
              isShowCheckCode: false,
              isShowResetPassword: true,
            });
          }
        })
        .catch(error => {
          this.dropdown.alertWithType('error', 'Error', error);
          this.loadingBtnChkCode.showLoading(false);
        });
    } else {
      this.dropdown.alertWithType('error', 'Error', 'لطفا کد را وارد نمایید.');
    }
  };

  _ResendCode = () => {
    axios
      .get(
        BaseApiUrl +
          '/MessageApi/SendVerificationCode?callNumber=/' +
          this.state.forgotPasswordData.MobileForSendCode,
          '&TLID=' + this.props.configApp.TLID,
      )
      .then(res => {
        if (res.data.isError == true) {
          this.dropdown.alertWithType(
            'error',
            'Error',
            res.data.Errors.Message,
          );
        } else {
          this.dropdown.alertWithType('success', 'Error', res.data.Errors.Message);
        }
      });
  };

  ResetPassword = () => {
    const {
      NewPassword,
      MobileForSendCode,
      verficationCode,
    } = this.state.forgotPasswordData;
    if (NewPassword != '') {
      this.loadingBtnReset.showLoading(true);
      var data = {
        callNumber: MobileForSendCode,
        confirmationCode: verficationCode,
        password: NewPassword,
        TLID:this.props.configApp.TLID,
      };
      axios
        .post(BaseApiUrl + '/MessageApi/ResetPassword', data)
        .then(res => {
          this.loadingBtnReset.showLoading(false);
          if (res.data.isError == true) {
            this.dropdown.alertWithType(
              'error',
              'خطا',
              res.data.Errors.Message,
            );
          } else {
            DropDownHolder.showAlert(
              'success',
              'اعلامیه',
              res.data.Errors.Message,
            );
            this.setState({
              ...this.state,
              loadingModalForgotPassword: false,
            });
          }
        })
        .catch(error => {
          this.dropdown.alertWithType('error', 'خطا', error);
          this.loadingBtnReset.showLoading(false);
        });
    } else {
      this.dropdown.alertWithType('error', 'خطا', 'لطفا پسورد را وارد نمایید.');
      this.loadingBtnReset.showLoading(false);
    }
  };

  handleChangeEmail(email) {
    this.setState(prevState => {
      return {
        loadingModal: false,
        userData: {
          Email: email,
          Password: prevState.userData.Password,
        },
      };
    }, this.disableBtnLogin);
  }

  handleChangeForgotMobile(mobile) {
    this.setState({
      ...this.state,
      forgotPasswordData: {
        verficationCode: this.state.forgotPasswordData.verficationCode,
        MobileForSendCode: mobile,
      },
    });
  }

  handleChangeForgotVerficationCode(code) {
    this.setState({
      ...this.state,
      forgotPasswordData: {
        verficationCode: code,
        MobileForSendCode: this.state.forgotPasswordData.MobileForSendCode,
      },
    });
  }

  handleChangeForgotResetPassword(password) {
    this.setState({
      ...this.state,
      forgotPasswordData: {
        verficationCode: this.state.forgotPasswordData.verficationCode,
        NewPassword: password,
        MobileForSendCode: this.state.forgotPasswordData.MobileForSendCode,
      },
    });
  }

  handleChangePassword = e => {
    this.setState(prevState => {
      return {
        loadingModal: false,
        userData: {
          Email: prevState.userData.Email,
          Password: e,
        },
      };
    }, this.disableBtnLogin);
  };

  disableBtnLogin() {
    const {Email, Password} = this.state.userData;
    if (Email != '' && Password != '') {
      if (Validation.validEmail(Email) == true) {
        this.setState({
          ...this.state,
          isDisabeBtnLogin: false,
        });
      } else {
        this.setState({
          ...this.state,
          isDisabeBtnLogin: true,
        });
      }
    } else {
      this.setState({
        ...this.state,
        isDisabeBtnLogin: true,
      });
    }
  }
  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={{flext: 1, flexDirection: 'column'}}>
          <View style={{height: 200}}>
            <Image
              style={{height: 200}}
              placeholder={<ActivityIndicator />}
              source={{
                uri: 'https://roocket.ir/public/images/2018/4/10/nodejs-2.png',
              }}
            />
          </View>
          <View>
            <Input
              id="emailLoginTxt"
              leftIcon={this.renderIcon('ios-mail')}
              placeholder={commonUtility.getElementTitle('emailLoginTxt')}
              onChangeText={this.handleChangeEmail}
            />
            <Input
              id="passwordLoginTxt"
              leftIcon={this.renderIcon('ios-key')}
              placeholder={commonUtility.getElementTitle('passwordLoginTxt')}
              onChangeText={this.handleChangePassword.bind(this)}
            />
          </View>
          <View style={{ flex: 1, alignItems: 'center'}}>
            <View style={[initialAppStyle.spinnerViewStyle, {width: '80%',marginTop:animatedLoadinBtnConfig.marginTop}]}>
              <AnimateLoadingButton
                ref={c => {
                  this.loadingBtnSignIn = c;
                }}
                id="SignInBtn"
                width={animatedLoadinBtnConfig.width}
                height={animatedLoadinBtnConfig.height}
                title={commonUtility.getElementTitle('SignInBtn')}
                titleFontSize={animatedLoadinBtnConfig.titleFontSize}
                titleColor={animatedLoadinBtnConfig.titleColor}
                backgroundColor={animatedLoadinBtnConfig.backgroundColor}
                borderRadius={animatedLoadinBtnConfig.borderRadius}
                onPress={this._LoginEvent}
              />
            </View>
            <Button
              id="ForgotPassword"
              title={commonUtility.getElementTitle('ForgotPassword')}
              type="clear"
              onPress={this._forgotPasswordEvent}
              buttonStyle={{width: 400}}
            />
          </View>

          <Overlay
            height={40}
            width={40}
            overlayStyle={{opacity: 0.4, shadowOpacity: 1}}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            isVisible={this.state.loadingModal}>
            <ActivityIndicator height={100} width={100} />
          </Overlay>

          <Overlay
            containerStyle={{margin: 0, padding: 0}}
            borderRadius={3}
            animationType="fade"
            onBackdropPress={() => {
              this.setState({
                ...this.state,
                isSendCodeClicked: false,
                loadingModalForgotPassword: false,
                isSendVerificationCode: true,
                isShowCheckCode: false,
                isShowResetPassword: false,
              });
            }}
            height={'50%'}
            width={'90%'}
            overlayStyle={{opacity: 1, shadowOpacity: 1}}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            isVisible={this.state.loadingModalForgotPassword}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: -10,
                padding: 0,
              }}>
              <View
                style={{
                  backgroundColor: 'green',
                  height: '30%',
                  borderRadius: 3,
                }}>
                <Text>hello</Text>
              </View>

              <VerificationCodeComponent
                hide={this.state.isSendVerificationCode}>
                <Input
                  leftIcon={this.renderIcon('ios-call')}
                  id="MobileVerifyLogin"
                  placeholder={commonUtility.getElementPlaceHolder('MobileVerifyLogin')}
                  onChangeText={this.handleChangeForgotMobile}
                  value={this.state.forgotPasswordData.MobileForSendCode}
                />
                <View
                  style={[initialAppStyle.spinnerViewStyle, {width: '80%',marginTop:animatedLoadinBtnConfig.marginTop}]}>
                  <AnimateLoadingButton
                    ref={c => {
                      this.loadingBtnSend = c;
                    }}
                    width={animatedLoadinBtnConfig.width}
                    height={animatedLoadinBtnConfig.height}
                    title={commonUtility.getElementTitle('SendVerifyLogin')}
                    id="SendVerifyLogin"
                    titleFontSize={animatedLoadinBtnConfig.titleFontSize}
                    titleColor={animatedLoadinBtnConfig.titleColor}
                    backgroundColor={animatedLoadinBtnConfig.backgroundColor}
                    borderRadius={animatedLoadinBtnConfig.borderRadius}
                    onPress={this._sendVerificationCode}
                  />
                </View>
              </VerificationCodeComponent>

              <VerificationCodeComponent hide={this.state.isShowCheckCode}>
                <Text>Timer</Text>
                <Input
                  leftIcon={this.renderIcon('ios-call')}
                  id="VerificationCodeLogin"
                  placeholder={commonUtility.getElementPlaceHolder('VerificationCodeLogin')}
                  onChangeText={this.handleChangeForgotVerficationCode}
                />
                <View
                  style={[initialAppStyle.spinnerViewStyle, {width: '80%',marginTop:animatedLoadinBtnConfig.marginTop}]}>
                  <AnimateLoadingButton
                    ref={c => {
                      this.loadingBtnChkCode = c;
                    }}
                    width={animatedLoadinBtnConfig.width}
                    height={animatedLoadinBtnConfig.height}
                    id="CheckCodeLogin"
                    title={commonUtility.getElementTitle('CheckCodeLogin')}
                    titleFontSize={animatedLoadinBtnConfig.titleFontSize}
                    titleColor={animatedLoadinBtnConfig.titleColor}
                    backgroundColor={animatedLoadinBtnConfig.backgroundColor}
                    borderRadius={animatedLoadinBtnConfig.borderRadius}
                    onPress={this._CheckCode}
                  />
                </View>
                <Button
                  id="ResendLogin"
                  title={commonUtility.getElementTitle('ResendLogin')}
                  onPress={this._ResendCode}
                  type="clear"
                  buttonStyle={{
                    width: 200,
                    marginTop: 5,
                    justifyContent: 'center',
                  }}
                />
              </VerificationCodeComponent>

              <VerificationCodeComponent hide={this.state.isShowResetPassword}>
                <Input
                  leftIcon={this.renderIcon('ios-call')}
                  id="NewPasswordLogin"
                  placeholder={commonUtility.getElementPlaceHolder('NewPasswordLogin')}
                  onChangeText={this.handleChangeForgotResetPassword}
                />
                <View
                  style={[initialAppStyle.spinnerViewStyle, {width: '80%',marginTop:animatedLoadinBtnConfig.marginTop}]}>
                  <AnimateLoadingButton
                    ref={c => {
                      this.loadingBtnReset = c;
                    }}
                    id="ResetPasswordBtn"
                    width={animatedLoadinBtnConfig.width}
                    height={animatedLoadinBtnConfig.height}
                    title={commonUtility.getElementTitle('ResetPasswordBtn')}
                    titleFontSize={animatedLoadinBtnConfig.titleFontSize}
                    titleColor={animatedLoadinBtnConfig.titleColor}
                    backgroundColor={animatedLoadinBtnConfig.backgroundColor}
                    borderRadius={animatedLoadinBtnConfig.borderRadius}
                    onPress={this.ResetPassword}
                  />
                </View>
              </VerificationCodeComponent>
            </View>
            <DropdownAlert
              ref={ref => (this.dropdown = ref)}
              closeInterval={2500}
              zIndex={2000}
            />
          </Overlay>

        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserLogged: state.user.isUserLogged,
    userInformation: state.user.userInformation,
    configApp: state.configApp,
  };
};

const mapDispatchToProps = dispath => {
  return {
    setUserLogging: value => {
      dispath(isUserLogged(value));
    },
    saveUserInformation: value => {
      dispath(saveUserInformation(value));
    },

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);
