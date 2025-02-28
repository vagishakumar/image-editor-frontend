import { v4 as uuidv4 } from "uuid";
const initialState = {
  historyList:[]
};

const historyListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ERASE_OBJECT_FULFILLED": 
    return {
      ...state,
      historyList: [{id:uuidv4(),
        download: action.payload.data.result_url,
        url: action.payload.resultUrl,
        timestamp: new Date().toISOString(),
      }, ...(state.historyList || [])],
    };
    case "MODIFY_IMG_FULFILLED": 
     return {
      ...state,
      historyList: [{id:uuidv4(),
        url: action.payload.resultUrl,
        download:action.payload.data.urls[0],
        timestamp: new Date().toISOString(),
      }, ...(state.historyList || [])],
    };
    case "GENERATE_IMG_FULFILLED": 
    
     return {
      ...state,
      historyList: [{id:uuidv4(),
        download: action.payload.data.result[0].urls[0],
        url: action.payload.resultUrl,
        timestamp: new Date().toISOString(),
      }, ...(state.historyList || [])],
    };
    case "BG_GENERATION_IMG_FULFILLED": 
    
     return {
      ...state,
      historyList: [{id:uuidv4(),
        download: action.payload.data.result[0],
          url: action.payload.resultUrl,
        timestamp: new Date().toISOString(),
      }, ...(state.historyList || [])],
    };
    case "EXPAND_IMG_FULFILLED": 
     return {
      ...state,
      historyList: [{id:uuidv4(),
        download: action.payload.data.result_url,
          url: action.payload.resultUrl,
        timestamp: new Date().toISOString(),
      }, ...(state.historyList || [])],
    };
    case "BLUR_BG_IMG_FULFILLED": 
    
     return {
      ...state,
      historyList: [{id:uuidv4(),
        download: action.payload.data.result_url,
        url: action.payload.resultUrl,
        timestamp: new Date().toISOString(),
      }, ...(state.historyList || [])],
    };
    case "INCREASE_RESOLUTION_IMG_FULFILLED": 
    
     return {
      ...state,
      historyList: [{id:uuidv4(),
        download: action.payload.data.result_url,
          url: action.payload.resultUrl,
        timestamp: new Date().toISOString(),
      }, ...(state.historyList || [])],
    };
    case "REMOVE_FOREGROUND_IMG_FULFILLED": 
    
     return {
      ...state,
      historyList: [{id:uuidv4(),
        download: action.payload.data.result_url,
          url: action.payload.resultUrl,
        timestamp: new Date().toISOString(),
      }, ...(state.historyList || [])],
    };
    case "REMOVE_BG_FULFILLED":
       return {
      ...state,
      historyList: [{id:uuidv4(),
        download: action.payload.data.result_url,
        url: action.payload.resultUrl,
        timestamp: new Date().toISOString(),
      }, ...(state.historyList || [])],
    };
    case "UPLOAD_IMG_FULFILLED":
      return {
        ...state,
        historyList: [{id:uuidv4(),
          url: action.payload.imageUrl,
          timestamp: new Date().toISOString(),
        }, ...(state.historyList|| [])],
      };
      
    default:
      return state;
  }
};

export default historyListReducer;
