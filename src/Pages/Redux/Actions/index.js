import {SET_USER_LOGGER} from './type';
export const setUserLogged =(isLogged) =>({
    type:SET_USER_LOGGER,
    payload:isLogged
})