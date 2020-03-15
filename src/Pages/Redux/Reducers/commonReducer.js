import {SET_EMAIL_VALIDATE} from './../Actions/type';

const initialState = {
    isValidEmail:false
}
export default commonreducer = (state = initialState , action={})=>{
    switch (action.type) {
        case SET_EMAIL_VALIDATE:
            let reg = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,5}$/;
            const {payload} = action;
            let result = initialState;
            if(reg.test(payload) === true)
            {
                 result = {
                    isValidEmail:true
                };
            }
            else {
                 result = {
                    isValidEmail:false
                };
            }
            return result;
        default:
            return state;
    }
}