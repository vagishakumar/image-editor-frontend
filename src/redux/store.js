// import imageReducer from "./imagereducer";
import { createStore, applyMiddleware } from 'redux';
// import promiseMiddleware from "redux-promise"
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from './rootreducer';

// const { default: imageReducer } = require("./imagereducer");

const store = createStore(
  rootReducer,           
  applyMiddleware(promiseMiddleware)  
);
export default store;

