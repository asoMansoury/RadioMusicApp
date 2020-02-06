import {createStore,applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import reducers from './../Reducers/index';
import {persistStore, persistReducer} from 'redux-persist';
import { AsyncStorage } from 'react-native';


const middlware = [thunk];
// middlware.push(createLogger);
const persistConfig ={
    key:'userReducer',
    storage:AsyncStorage
}
const persistedReducer = persistReducer(persistConfig,reducers);
const store = createStore(
    persistedReducer,
    undefined,
    compose(
        applyMiddleware(...middlware)
        
        ),
);

persistStore(store);
export default store;