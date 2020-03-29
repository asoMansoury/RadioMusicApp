/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Input, Button, Overlay} from 'react-native-elements';
import {Image, View, ActivityIndicator, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {initialAppStyle, spinnerBtnConfig} from './../../../CommonFiles/Style';
import {connect} from 'react-redux';
import {saveUserInformation, isUserLogged} from '../../Redux/Actions/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import VerificationCodeComponent from './ForgotPasswordComponent/VerificationCodeComponent';
import {BaseApiUrl, 
  NAV_BAR_HEIGHT,
  STATUS_BAR_HEIGHT,
  HEADER_HEIGHT,
  IS_IPHONE_X} from './../../../CommonFiles/ConstantData';
import {DropDownHolder} from './../../component/DropDownHolder';
import DropdownAlert from 'react-native-dropdownalert';
import SpinnerButton from 'react-native-spinner-button';
import {Validation} from './../../../CommonFiles/Validation';

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
      isShowCheckCodeLoading: false,
      isShowResetPasswordLoading: false,

      isShowResetPassword: false,
      isSendCodeClicked: false,
      forgotPasswordData: {
        MobileForSendCode: '+98',
        verficationCode: '',
        NewPassword: '',
      },
      userData: {
        Email: '',
        Password: '',
      },

      isShowSignInLoading: false,
    };
  }

  componentDidUpdate() {}

  renderIcon = icon => () => <Ionicons name={icon} size={24} />;

  _LoginEvent = () => {
    var data = {
      email: this.state.userData.Email,
      password: this.state.userData.Password,
    };
    this.setState({
      ...this.state,
      isShowSignInLoading: true,
    });
    axios.post(BaseApiUrl + '/UserApi/Login', data).then(res => {
      this.setState({
        ...this.state,
        isShowSignInLoading: false,
      });
      if (res.data.isError === true) {
        this.props.showDropDownAlert('error', 'خطا', res.data.Errors.Message);
        this.props.setUserLogging(false);
      } else {
        this.props.showDropDownAlert(
          'success',
          'خطا',
          'عملیات با موفقیت انجام گردید',
        );
        this.props.setUserLogging(true);
        const userInformation = {
          mobile: res.data.Mobile,
          userName: res.data.userName,
          email: res.data.email,
        };
        this.props.saveUserInformation(userInformation);
      }
    });
  };

  _forgotPasswordEvent = () => {
    this.setState({
      ...this.state,
      loadingModalForgotPassword: true,
    });
  };

  _sendVerificationCode = () => {
    this.setState({
      ...this.state,
      isSendCodeClicked: true,
    });
    const {MobileForSendCode} = this.state.forgotPasswordData;
    if (Validation.checkMobile(MobileForSendCode)) {
      axios
        .get(
          BaseApiUrl +
            '/MessageApi/SendVerificationCode?callNumber=' +
            this.state.forgotPasswordData.MobileForSendCode,
        )
        .then(res => {
          if (res.data.isError == true) {
            this.dropdown.alertWithType(
              'error',
              'Error',
              res.data.Errors.Message,
            );
          } else {
            this.dropdown.alertWithType('error', 'Error', 'کد ارسال گردید.');
            this.setState({
              ...this.state,
              isSendVerificationCode: false,
              isShowCheckCode: true,
              isShowResetPassword: false,
              isSendCodeClicked: false,
            });
          }
        })
        .catch(error => {
          this.dropdown.alertWithType('error', 'Error', error);
          this.setState({
            ...this.state,
            isSendCodeClicked: false,
          });
        });
    } else {
      this.dropdown.alertWithType(
        'error',
        'Error',
        'لطفا شماره موبایل را بدرستی وارد نمایید.',
      );
      this.setState({
        ...this.state,
        isSendCodeClicked: false,
      });
    }
  };

  _CheckCode = () => {
    this.setState({
      ...this.state,
      isShowCheckCodeLoading: true,
    });
    const {verficationCode, MobileForSendCode} = this.state.forgotPasswordData;
    if (verficationCode != '') {
      var data = {
        callNumber: MobileForSendCode,
        confirmationCode: verficationCode,
      };
      axios
        .post(BaseApiUrl + '/MessageApi/ConfirmVerificationCode', data)
        .then(res => {
          if (res.data.isError == true) {
            DropDownHolder.showAlert('error', 'خطا', res.data.Errors.Message);
            this.setState({
              ...this.state,
              isShowCheckCodeLoading: false,
            });
          } else {
            DropDownHolder.showAlert(
              'success',
              'اعلامیه',
              res.data.Errors.Message,
            );
            this.setState({
              ...this.state,
              isSendVerificationCode: false,
              isShowCheckCode: false,
              isShowResetPassword: true,
              isShowCheckCodeLoading: false,
            });
          }
        })
        .catch(error => {
          DropDownHolder.showAlert('error', 'فرمت', error);
          this.setState({
            ...this.state,
            isShowCheckCodeLoading: false,
          });
        });
    } else {
      DropDownHolder.showAlert('error', 'فرمت', 'data');
      this.setState({
        ...this.state,
        isShowCheckCodeLoading: false,
      });
    }
  };

  _ResendCode = () => {
    this.setState({
      ...this.state,
      isSendVerificationCode: true,
      isShowCheckCode: false,
      isShowResetPassword: false,
    });
  };

  ResetPassword = () => {
    this.setState({
      ...this.state,
      isShowResetPasswordLoading: true,
    });
    const {
      NewPassword,
      MobileForSendCode,
      verficationCode,
    } = this.state.forgotPasswordData;
    if (NewPassword != '') {
      var data = {
        callNumber: MobileForSendCode,
        confirmationCode: verficationCode,
        password: NewPassword,
      };
      axios
        .post(BaseApiUrl + '/MessageApi/ResetPassword', data)
        .then(res => {
          if (res.data.isError == true) {
            DropDownHolder.showAlert('error', 'خطا', res.data.Errors.Message);
            this.setState({
              ...this.state,
              isShowResetPasswordLoading: false,
            });
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
          DropDownHolder.showAlert('error', 'فرمت', error);
          this.setState({
            ...this.state,
            isShowResetPasswordLoading: false,
          });
        });
    } else {
      DropDownHolder.showAlert('error', 'فرمت', 'data');
      this.setState({
        ...this.state,
        isShowCheckCodeLoading: false,
        isShowResetPasswordLoading: false,
      });
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
      <KeyboardAwareScrollView >
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
              leftIcon={this.renderIcon('ios-mail')}
              placeholder="Email"
              onChangeText={this.handleChangeEmail}
            />
            <Input
              leftIcon={this.renderIcon('ios-key')}
              placeholder="Password"
              onChangeText={this.handleChangePassword.bind(this)}
            />
          </View>
          <View style={{marginTop: 10, flex: 1, alignItems: 'center'}}>
            <View style={[initialAppStyle.spinnerViewStyle, {width: '80%'}]}>
              <SpinnerButton
                disabled={this.state.isDisabeBtnLogin}
                isLoading={this.state.isShowSignInLoading}
                spinnerType={spinnerBtnConfig.spinnerType}
                onPress={this._LoginEvent}
                buttonStyle={[initialAppStyle.spinnerBtnStyle, {height: 50}]}
                indicatorCount={spinnerBtnConfig.indicatorCount}>
                <Text>Sign In</Text>
              </SpinnerButton>
            </View>
            <Button
              title="Forgot Password"
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
                  placeholder="Mobile"
                  onChangeText={this.handleChangeForgotMobile}
                  value={this.state.forgotPasswordData.MobileForSendCode}
                />
                <View
                  style={[initialAppStyle.spinnerViewStyle, {width: '80%'}]}>
                  <SpinnerButton
                    isLoading={this.state.isSendCodeClicked}
                    spinnerType={spinnerBtnConfig.spinnerType}
                    onPress={this._sendVerificationCode}
                    buttonStyle={[
                      initialAppStyle.spinnerBtnStyle,
                      {height: 50},
                    ]}
                    indicatorCount={spinnerBtnConfig.indicatorCount}>
                    <Text>Send</Text>
                  </SpinnerButton>
                </View>
              </VerificationCodeComponent>

              <VerificationCodeComponent hide={this.state.isShowCheckCode}>
                <Text>Timer</Text>
                <Input
                  leftIcon={this.renderIcon('ios-call')}
                  placeholder="Verification Code"
                  onChangeText={this.handleChangeForgotVerficationCode}
                />
                <View
                  style={[initialAppStyle.spinnerViewStyle, {width: '80%'}]}>
                  <SpinnerButton
                    isLoading={this.state.isShowCheckCodeLoading}
                    spinnerType={spinnerBtnConfig.spinnerType}
                    onPress={this._CheckCode}
                    buttonStyle={[
                      initialAppStyle.spinnerBtnStyle,
                      {height: 50},
                    ]}
                    indicatorCount={spinnerBtnConfig.indicatorCount}>
                    <Text>Check Code</Text>
                  </SpinnerButton>
                </View>
                <Button
                  title="Resend"
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
                  placeholder="New Password"
                  onChangeText={this.handleChangeForgotResetPassword}
                />
                <View
                  style={[initialAppStyle.spinnerViewStyle, {width: '80%'}]}>
                  <SpinnerButton
                    isLoading={this.state.isShowResetPasswordLoading}
                    spinnerType={spinnerBtnConfig.spinnerType}
                    onPress={this.ResetPassword}
                    buttonStyle={[
                      initialAppStyle.spinnerBtnStyle,
                      {height: 50},
                    ]}
                    indicatorCount={spinnerBtnConfig.indicatorCount}>
                    <Text>Reset Password</Text>
                  </SpinnerButton>
                </View>
              </VerificationCodeComponent>
            </View>
            <DropdownAlert
              ref={ref => (this.dropdown = ref)}
              closeInterval={1500}
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
