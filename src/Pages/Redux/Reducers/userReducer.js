import {SET_USER_LOGGER} from './../Actions/type';

const initialState = {
    isFirstTimeLogIn:true
}
export default user = (state = initialState , action={})=>{
    switch (action.type) {
        case SET_USER_LOGGER:
            const {payload} = action;
            let result = {
                isFirstTimeLogIn:payload
            };
            return result;
        default:
            return state;
    }
}