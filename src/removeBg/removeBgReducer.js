const initialState = {
    editedImage: null,
    status: null,
    error: null,
  };
  
  const removeBgReducer = (state = initialState, action) => {
    console.log('action',action.type)

    switch (action.type) {
      case "REMOVE_BG_PENDING":
        return { ...state, status: "pending", error: null };
  
      case "REMOVE_BG_FULFILLED":
        return { ...state, editedImage: action.payload, status: "success", error: null };
  
      case "REMOVE_BG_FAILED":
        return { ...state, status: "failed", error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default removeBgReducer;
  