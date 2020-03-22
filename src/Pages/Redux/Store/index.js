/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './../Reducers/index';
import {persistStore, persistCombineReducers} from 'redux-persist';
import {AsyncStorage} from 'react-native';

const middlware = [thunk, logger];
// middlware.push(createLogger);
const persistConfig = {
  key: 'userReducer',
  storage: AsyncStorage,
  blacklist: ['rehydrated', 'commonreducer'],
};
const persistedReducer = persistCombineReducers(persistConfig, reducers);
let store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(...middlware)),
);

let persistor = persistStore(store);

export default function create(initialState) {
  if (!store) {
    store = createStore(
      persistCombineReducers,
      initialState,
      compose(applyMiddleware(...middlware)),
    );
  }
  return store;
}

export function getPersistor(store) {
  if (!persistor) {
    persistor = persistor(store);
  }
  return persistor;
}
export {persistor, store};
