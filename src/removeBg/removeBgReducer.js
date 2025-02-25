import { v4 as uuidv4 } from 'uuid';
const initialState = {
    editedImages: [],
    status: null,
    error: null,
  };
  
  const removeBgReducer = (state = initialState, action) => {
    // console.log('action',action.type)

    switch (action.type) {
      case "REMOVE_BG_PENDING":
        return { ...state, status: "pending", error: null };
  
      case "REMOVE_BG_FULFILLED":
        // console.log("hi",action.payload)
        return { ...state,editedImages: [...state.editedImages || [], { 
          id:uuidv4(),
          download:action.payload.data.result_url,
          url: action.payload.resultUrl,
          timestamp: new Date().toISOString() }], status: "success", error: null };
      case "REMOVE_BG_FAILED":
        return { ...state, status: "failed", error: action.payload };
      default:
        return state;
    }
  };
  
  export default removeBgReducer;
  