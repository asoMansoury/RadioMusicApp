import {SET_USER_LOGGER,SET_EMAIL_VALIDATE} from './type';
export const setUserLogged =(isLogged) =>({
    type:SET_USER_LOGGER,
    payload:isLogged
});

export const checkEmailValidate =(email)=>({
    type:SET_EMAIL_VALIDATE,
    payload:email
})