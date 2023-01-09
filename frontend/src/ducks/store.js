import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { rockReducer } from './rocks/reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createMiddleware } from 'redux-api-middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
  rocks: rockReducer,
});

const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(thunk, createMiddleware(), logger))
);

export default store;
