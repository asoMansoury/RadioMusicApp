import {combineReducers} from 'redux';
import user from './userReducer';
import commonreducer from './commonReducer';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  user: user,
  commonreducer: commonreducer,
};
