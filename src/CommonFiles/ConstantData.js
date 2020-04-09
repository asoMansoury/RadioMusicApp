/* eslint-disable no-undef */
import {Dimensions, Platform} from 'react-native';
export const BaseApiUrl = 'http://192.168.164.2:53094/api';
// export const BaseApiUrl = 'http://185.83.114.167:8016/api';
export const mainColor = '#388E3C';
export const IS_IPHONE_X =
  Dimensions.get('window').height === 812 ||
  Dimensions.get('window').height === 896;
export const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
export const HEADER_HEIGHT =
  Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
export const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
export const platformHeight = Dimensions.get('window').height;
export const platformWidth = Dimensions.get('window').width;
export const platformType = Platform.OS === 'ios' ? 'ios' : 'android';
export const SignInKey = 'SignIn';
export const SignUpKey = 'SignUp';
export const UITypeID = '3';
export const UIName = {
  Profile: 'Profile',
};
export const TLID = {
  English: 2,
  Persian: 4,
};
