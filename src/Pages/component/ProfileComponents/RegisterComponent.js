/* eslint-disable react/jsx-no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Input, Overlay, Text, Button} from 'react-native-elements';
import {View, Image, ActivityIndicator} from 'react-native';
import {
  initialAppStyle,
  animatedLoadinBtnConfig,
} from './../../../CommonFiles/Style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {isUserLogged} from '../../Redux/Actions/index';
import {BaseApiUrl} from './../../../CommonFiles/ConstantData';
import axios from 'axios';
import {DropDownHolder} from './../../component/DropDownHolder';
import DropdownAlert from 'react-native-dropdownalert';
import VerificationCodeComponent from './ForgotPasswordComponent/VerificationCodeComponent';
import {connect} from 'react-redux';
import {Validation} from './../../../CommonFiles/Validation';
import AnimateLoadingButton from 'react-native-animate-loading-button';

class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        Mobile: '+98',
        Password: '',
        ConfirmPassword: '',
        Email: '',
        UserName: '',
        confirmationCode: '',
      },

      isDisabeSignUpBtn: true,
      isValidPassword: false,
      isExistUserName: false,
      isShowModalConfirmationMobile: false,
    };
    this.handleConfirmPassTXT = this.handleConfirmPassTXT.bind(this);
    this.handleEmailTxt = this.handleEmailTxt.bind(this);
    this.handleMobileTxt = this.handleMobileTxt.bind(this);
    this.handlePasswordTxt = this.handlePasswordTxt.bind(this);
    this.disableSignUpBtn = this.disableSignUpBtn.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.CheckUserName = this.CheckUserName.bind(this);
    this.checkMobileValid = this.checkMobileValid.bind(this);
    this.checkEmailValid = this.checkEmailValid.bind(this);
    this._CheckCode = this._CheckCode.bind(this);
    this.handleChangeConfirmation = this.handleChangeConfirmation.bind(this);
    this._ResendCode = this._ResendCode.bind(this);
  }

  componentDidUpdate() {
    // this.props.showDropDownAlert('error','خطا','hh');
  }

  disableSignUpBtn() {
    const {Email, Password, ConfirmPassword, Mobile} = this.state.userData;
    if (
      Email != '' &&
      Password != '' &&
      ConfirmPassword != '' &&
      Mobile != ''
    ) {
      if (
        Validation.validEmail(Email) == true &&
        Validation.checkMobile(Mobile) == true &&
        Validation.checkPassword(Password, ConfirmPassword) == true
      ) {
        this.setState({
          ...this.state,
          isDisabeSignUpBtn: false,
          isValidPassword: true,
        });
      } else {
        this.setState({
          ...this.state,
          isDisabeSignUpBtn: true,
          isValidPassword: false,
        });
      }
    } else {
      this.setState({
        ...this.state,
        isDisabeSignUpBtn: true,
      });
    }
  }

  handleConfirmPassTXT(value) {
    this.setState(
      {
        ...this.state,
        userData: {
          ...this.state.userData,
          ConfirmPassword: value,
        },
      },
      this.disableSignUpBtn,
    );
  }

  handlePasswordTxt(value) {
    this.setState(
      {
        ...this.state,
        userData: {
          ...this.state.userData,
          Password: value,
        },
      },
      this.disableSignUpBtn,
    );
  }

  handleEmailTxt(value) {
    this.setState(
      {
        ...this.state,
        userData: {
          ...this.state.userData,
          Email: value,
        },
      },
      this.disableSignUpBtn,
    );
  }

  handleMobileTxt(value) {
    this.setState(
      {
        ...this.state,
        userData: {
          ...this.state.userData,
          Mobile: value,
        },
      },
      this.disableSignUpBtn,
    );
  }

  handleUserName(value) {
    this.setState({
      ...this.state,
      userData: {
        ...this.state.userData,
        UserName: value,
      },
    });
  }

  _CheckCode = () => {
    const {confirmationCode, Mobile} = this.state.userData;
    if (confirmationCode != '' && Mobile != '') {
      this.loadingBtnChkCode.showLoading(true);
      var data = {
        callNumber: Mobile,
        confirmationCode: confirmationCode,
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
            const userInformation = {
              mobile: Mobile,
              userName: this.state.userData.UserName,
              email: this.state.userData.Email,
            };
            this.props.saveUserInformation(userInformation);
            this.props.setUserLogging(true);
            this.setState({
              ...this.state,
              isShowModalConfirmationMobile: false,
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

  handleChangeConfirmation(code) {
    this.setState({
      ...this.state,
      userData: {
        confirmationCode: code,
        Mobile: this.state.userData.Mobile,
      },
    });
  }

  RegisterEvent = () => {
    var data = {
      email: this.state.userData.Email,
      password: this.state.userData.Password,
      Mobile: this.state.userData.Mobile,
      userName: this.state.userData.UserName,
    };

    if (
      data.email === '' ||
      data.password === '' ||
      data.Mobile === '' ||
      data.userName === '' ||
      this.state.userData.ConfirmPassword === ''
    ) {
      this.props.showDropDownAlert(
        'error',
        'خطا',
        'اطلاعات به صورت کامل وارد شده است.',
      );
      return;
    }
    if (this.state.isValidPassword == false) {
      this.props.showDropDownAlert('error', 'خطا', 'پسورد مطابقت ندارد.');
      return;
    }
    this.loadingBtnSignUP.showLoading(true);
    axios
      .post(BaseApiUrl + '/UserApi/RegisterUserFromMobile', data)
      .then(res => {
        this.loadingBtnSignUP.showLoading(false);
        if (res.data.isError === true) {
          this.props.showDropDownAlert('error', 'خطا', res.data.Errors.Message);
          this.props.setUserLogging(false);
        } else {
          this.props.showDropDownAlert(
            'success',
            'خطا',
            'عملیات با موفقیت انجام گردید',
          );
          this.setState({
            ...this.state,
            isShowModalConfirmationMobile: true,
          });

          const userInformation = {
            mobile: data.Mobile,
            userName: data.userName,
            email: data.email,
          };
          this.props.saveUserInformation(userInformation);
        }
      });
  };

  checkMobileValid = () => {
    var data = {
      Mobile: this.state.userData.Mobile,
    };
    if (Validation.checkMobile(data.Mobile) === false) {
      this.props.showDropDownAlert(
        'error',
        'خطا',
        'لطفا موبایل را به درستی وارد نمایید',
      );
    }
    axios.post(BaseApiUrl + '/UserApi/CheckMobile', data).then(res => {
      if (res.data.isError === true) {
        this.props.showDropDownAlert('error', 'خطا', res.data.Errors.Message);
      } else {
        if (res.data.isUserNameExist === true) {
          this.props.showDropDownAlert(
            'info',
            'اطلاع',
            res.data.isUserNameExistMessage,
          );
        } else {
          this.props.showDropDownAlert(
            'success',
            'موفق',
            res.data.isUserNameExistMessage,
          );
        }
      }
    });
  };
  CheckUserName = () => {
    var data = {
      userName: this.state.userData.UserName,
    };
    axios.post(BaseApiUrl + '/UserApi/CheckUserName', data).then(res => {
      if (res.data.isError == true) {
        this.props.showDropDownAlert('error', 'خطا', res.data.Errors.Message);
      } else {
        if (res.data.isUserNameExist == true) {
          this.setState({
            ...this.state,
            isExistUserName: true,
          });
          this.props.showDropDownAlert(
            'info',
            'اطلاع',
            res.data.isUserNameExistMessage,
          );
        } else {
          this.setState({
            ...this.state,
            isExistUserName: false,
          });
          this.props.showDropDownAlert(
            'success',
            'موفق',
            res.data.isUserNameExistMessage,
          );
        }
      }
    });
  };
  checkEmailValid = () => {
    var data = {
      email: this.state.userData.Email,
    };
    if (data.email === '') {
    } else {
      if (Validation.validEmail(data.email) === false) {
        this.props.showDropDownAlert(
          'error',
          'خطا',
          'لطفا ایمیل را به درستی وارد نمایید',
        );
      }
      axios.post(BaseApiUrl + '/UserApi/CheckEmail', data).then(res => {
        if (res.data.isError === true) {
          this.props.showDropDownAlert('error', 'خطا', res.data.Errors.Message);
        } else {
          if (res.data.isUserNameExist === true) {
            this.props.showDropDownAlert(
              'info',
              'اطلاع',
              res.data.isUserNameExistMessage,
            );
          } else {
            this.props.showDropDownAlert(
              'success',
              'موفق',
              res.data.isUserNameExistMessage,
            );
          }
        }
      });
    }
  };

  _ResendCode = () => {
    axios
      .get(
        BaseApiUrl +
          '/MessageApi/SendVerificationCode?callNumber=/' +
          this.state.userData.Mobile,
      )
      .then(res => {
        if (res.data.isError == true) {
          this.dropdown.alertWithType(
            'error',
            'Error',
            res.data.Errors.Message,
          );
        } else {
          this.dropdown.alertWithType('success', 'Error', 'کد ارسال گردید.');
        }
      });
  };

  renderIcon = icon => () => <Ionicons name={icon} size={24} />;

  render() {
    return (
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
            leftIcon={this.renderIcon('ios-call')}
            placeholder="Mobile"
            value={this.state.userData.Mobile}
            onBlur={this.checkMobileValid}
            onChangeText={this.handleMobileTxt}
          />
          <Input
            leftIcon={this.renderIcon('ios-mail')}
            placeholder="UserName"
            value={this.state.userData.UserName}
            onBlur={this.CheckUserName}
            onChangeText={this.handleUserName}
          />
          <Input
            leftIcon={this.renderIcon('ios-key')}
            placeholder="Password"
            value={this.state.userData.Password}
            onChangeText={this.handlePasswordTxt}
          />
          <Input
            leftIcon={this.renderIcon('ios-key')}
            placeholder="Confirm Password"
            value={this.state.userData.ConfirmPassword}
            onChangeText={this.handleConfirmPassTXT}
          />
          <Input
            leftIcon={this.renderIcon('ios-mail')}
            placeholder="Email"
            onBlur={this.checkEmailValid}
            value={this.state.userData.Email}
            onChangeText={this.handleEmailTxt}
          />
        </View>
        <Overlay
          containerStyle={{margin: 0, padding: 0}}
          borderRadius={3}
          animationType="fade"
          onBackdropPress={() => {
            this.setState({
              ...this.state,
              isShowModalConfirmationMobile: false,
            });
          }}
          height={'50%'}
          width={'90%'}
          overlayStyle={{opacity: 1, shadowOpacity: 1}}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          isVisible={this.state.isShowModalConfirmationMobile}>
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

            <VerificationCodeComponent hide={this.state.isShowCheckCode}>
              <Text>Timer</Text>
              <Input
                leftIcon={this.renderIcon('ios-call')}
                placeholder="Confirmation Code"
                onChangeText={this.handleChangeConfirmation}
              />
              <View
                style={[
                  initialAppStyle.spinnerViewStyle,
                  {width: '80%', marginTop: 6},
                ]}>
                <AnimateLoadingButton
                  ref={c => {
                    this.loadingBtnChkCode = c;
                  }}
                  width={animatedLoadinBtnConfig.width}
                  height={animatedLoadinBtnConfig.height}
                  title="Confirm"
                  titleFontSize={animatedLoadinBtnConfig.titleFontSize}
                  titleColor={animatedLoadinBtnConfig.titleColor}
                  backgroundColor={animatedLoadinBtnConfig.backgroundColor}
                  borderRadius={animatedLoadinBtnConfig.borderRadius}
                  onPress={this._CheckCode}
                />
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
            <DropdownAlert
              ref={ref => (this.dropdown = ref)}
              closeInterval={1500}
              zIndex={2000}
            />
          </View>
        </Overlay>
        <View style={{marginTop: 10, flex: 1, alignItems: 'center'}}>
          <View style={[initialAppStyle.spinnerViewStyle, {width: '80%'}]}>
            <AnimateLoadingButton
              ref={c => {
                this.loadingBtnSignUP = c;
              }}
              width={animatedLoadinBtnConfig.width}
              height={animatedLoadinBtnConfig.height}
              title="Sign Up"
              titleFontSize={animatedLoadinBtnConfig.titleFontSize}
              titleColor={animatedLoadinBtnConfig.titleColor}
              backgroundColor={animatedLoadinBtnConfig.backgroundColor}
              borderRadius={animatedLoadinBtnConfig.borderRadius}
              onPress={this.RegisterEvent}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapstatesToProps = state => {
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
  mapstatesToProps,
  mapDispatchToProps,
)(RegisterComponent);
