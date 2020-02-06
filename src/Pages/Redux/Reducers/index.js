import {combineReducers} from 'redux';
import user from './userReducer';

const rehydrated = (state=false,action)=>{
    switch (action.type) {
        case 'persist/REHYDRATE':
            
            return true;
    
        default:
            return state;
    }
}


export default combineReducers({
    rehydrated,
    user:user
});