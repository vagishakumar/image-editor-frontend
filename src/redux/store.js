// import imageReducer from "./imagereducer";
import { createStore, applyMiddleware } from 'redux';

import promiseMiddleware from "redux-promise"
const { default: imageReducer } = require("./imagereducer");

const store = createStore(
  imageReducer,           
  applyMiddleware(promiseMiddleware)  
);

export default store;
