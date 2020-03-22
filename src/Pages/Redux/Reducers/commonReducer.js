/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {SET_EMAIL_VALIDATE, SET_MOBILE_VALIDATE} from './../Actions/type';

const initialState = {
  isValidEmail: false,
  isValidMobile: false,
  isUserLogged: false,
};
export default function commonreducer(state = initialState, action = {}) {
  const {payload} = action;
  let result = {
    ...state,
  };
  switch (action.type) {
    case SET_EMAIL_VALIDATE:
      let reg = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,5}$/;
      if (reg.test(payload) === true) {
        result = {
          ...state,
          isValidEmail: true,
        };
      } else {
        result = {
          ...state,
          isValidEmail: false,
        };
      }
      return result;
    case SET_MOBILE_VALIDATE:
      let regMobile = /^(\+\d{1,2}|0)?9\d{9}$/;
      if (regMobile.test(payload) === true) {
        result = {
          ...state,
          isValidMobile: true,
        };
      } else {
        result = {
          ...state,
          isValidMobile: false,
        };
      }
      return result;

    default:
      return state;
  }
}
