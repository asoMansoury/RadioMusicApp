import {SET_IS_FIRST_TIME_RUNNING,SET_IS_USER_LOGGED,SET_USER_INOFORMATION} from './../Actions/type';

const initialState = {
    isFirstTimeRunning:false,
    isUserLogged:false,
    userInformation:{
        mobile:'',
        userName:'',
        email:''
    }
}
export default user = (state = initialState , action={})=>{
    const {payload} = action;
    switch (action.type) {
        case SET_IS_FIRST_TIME_RUNNING:
            
            let result = {
                ...state,
                isFirstTimeRunning:payload,
                isUserLogged: initialState.isUserLogged
            };
            return result;
        case SET_IS_USER_LOGGED:    
            result = {
                    ...state,
                    isUserLogged:payload
                }
            return result;
        case SET_USER_INOFORMATION:
            result ={
                ...state,
                isUserLogged:true,
                userInformation:payload
            }
        return result;
        default:
            return state;
    }
}