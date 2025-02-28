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
    case "Modify_IMG_FULFILLED": 
     return {
      ...state,
      historyList: [{id:uuidv4(),
        url: action.payload.resultUrl,
        download:action.payload.data.urls[0],
        timestamp: new Date().toISOString(),
      }, ...(state.historyList || [])],
    };
    case "Generate_IMG_FULFILLED": 
    console.log("in history")

     return {
      ...state,
      historyList: [{id:uuidv4(),
        download: action.payload.data.result[0].urls[0],
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
    case "Upload_Image_FULFILLED":
      return {
        ...state,
        historyList: [{id:uuidv4(),
          // download: `${action.payload.imageUrl}?dl=1`,
          url: action.payload.imageUrl,
          timestamp: new Date().toISOString(),
        }, ...(state.historyList|| [])],
      };
      
    default:
      return state;
  }
};

export default historyListReducer;
