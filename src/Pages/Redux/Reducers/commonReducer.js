import {SET_EMAIL_VALIDATE} from './../Actions/type';

const initialState = {
    isValidEmail:false
}
export default commonreducer = (state = initialState , action={})=>{
    switch (action.type) {
        case SET_EMAIL_VALIDATE:
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            const {payload} = action;
            let result = {};
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