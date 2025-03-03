import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from './rootreducer';


const store = createStore(
  rootReducer,           
  applyMiddleware(promiseMiddleware)  
);
export default store;

