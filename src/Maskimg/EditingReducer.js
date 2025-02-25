import { act } from "react";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  historyList: [],  
  status: null,
};

const EditingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Upload_Image_PENDING":
      return { ...state, status: "pending", };
    case "Upload_Image_FULFILLED":
      localStorage.setItem('currentimageurl',action.payload.imageUrl);
console.log("hi",action.payload.imageUrl)
      return { 
        ...state, 
        historyList: [...state.historyList || [], { 
            id:uuidv4(),
            download:`${action.payload.imageUrl}?dl=1`,
            url: action.payload.imageUrl,
            timestamp: new Date().toISOString() }],
        status: "success"};
    case "Upload_Image_FAILED":
      return { ...state, status: "failed" };
    case "REMOVE_BG_PENDING":
      return { ...state, status: "pending"};
    case "REMOVE_BG_FULFILLED":
      return { ...state,historyList: [...state.historyList || [], { 
          id:uuidv4(),
          download:action.payload.data.result_url,
          url: action.payload.resultUrl,
          timestamp: new Date().toISOString() }], status: "success"};
    case "REMOVE_BG_FAILED":
      return { ...state, status: "failed"};
    case "ERASE_OBJECT_PENDING":
      return { ...state, status: "pending"};
    case "ERASE_OBJECT_FULFILLED": {
      return { ...state, historyList: [...state.historyList || [], { 
            id:uuidv4(),
            download:action.payload.data.result_url,
            url: action.payload.resultUrl,
            timestamp: new Date().toISOString() }], status: "success"};}
    case "ERASE_OBJECT_FAILED":
       return { ...state, status: "failed"};
    default:
      return state;
  }
};

export default EditingReducer;
