import {SET_EMAIL_VALIDATE,SET_MOBILE_VALIDATE} from './../Actions/type';

const initialState = {
    isValidEmail:false,
    isValidMobile:false
}
export default commonreducer = (state = initialState , action={})=>{
    const {payload} = action;
    let result = initialState;
    
    switch (action.type) {
        case SET_EMAIL_VALIDATE:
            let reg = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,5}$/;
            if(reg.test(payload) === true)
            {
                 result = {
                    isValidEmail:true,
                    isValidMobile:false
                };
            }
            else {
                 result = {
                    isValidEmail:false,
                    isValidMobile:false
                };
            }
            return result;
        case SET_MOBILE_VALIDATE:
            let regMobile = /^(\+\d{1,2}|0)?9\d{9}$/;
            if(regMobile.test(payload) === true)
            {
                 result = {
                    isValidEmail:false,
                    isValidMobile:true
                };
            }
            else {
                 result = {
                    isValidEmail:false,
                    isValidMobile:false
                };
            }
            return result;
        default:
            return state;
    }
}