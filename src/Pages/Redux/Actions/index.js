import {
  SET_IS_FIRST_TIME_RUNNING,
  SET_EMAIL_VALIDATE,
  SET_MOBILE_VALIDATE,
  SET_IS_USER_LOGGED,
  SET_USER_INOFORMATION,
  SET_APP_LANGUAGE,
  SET_FILTER_ELEMENT,
} from './type';
export const setUserRunning = isLogged => ({
  type: SET_IS_FIRST_TIME_RUNNING,
  payload: isLogged,
});

export const checkEmailValidate = email => ({
  type: SET_EMAIL_VALIDATE,
  payload: email,
});

export const checkMobileValide = mobile => ({
  type: SET_MOBILE_VALIDATE,
  payload: mobile,
});

export const isUserLogged = value => ({
  type: SET_IS_USER_LOGGED,
  payload: value,
});

export const saveUserInformation = value => ({
  type: SET_USER_INOFORMATION,
  payload: value,
});

export const setPageLanguage = value => ({
  type: SET_APP_LANGUAGE,
  payload: value,
});

export const filterElementsLanguage = value => ({
  type: SET_FILTER_ELEMENT,
  payload: value,
});
