import {createStore,applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import reducers from './../Reducers/index';

const middlware = [thunk];
// middlware.push(createLogger);

const store = createStore(
    reducers,
    undefined,
    compose(applyMiddleware(...middlware))
);

export default store;