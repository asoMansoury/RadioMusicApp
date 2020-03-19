import {SET_IS_FIRST_TIME_RUNNING,SET_IS_USER_LOGGED} from './../Actions/type';

const initialState = {
    isFirstTimeRunning:false,
    isUserLogged:false
}
export default user = (state = initialState , action={})=>{
    const {payload} = action;
    switch (action.type) {
        case SET_IS_FIRST_TIME_RUNNING:
            
            let result = {
                isFirstTimeRunning:payload,
                isUserLogged: initialState.isUserLogged
            };
            return result;
        case SET_IS_USER_LOGGED:    
            result = {
                    ...initialState,
                    isUserLogged:payload
                }
            return result;
        default:
            return state;
    }
}