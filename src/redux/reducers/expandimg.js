
const initialState = {
    status: null,
  };
  
  const expandimg = (state = initialState, action) => {
    console.log("action",action.type)
    switch (action.type) {
      case "EXPAND_IMG_PENDING":
        return { ...state, status: "pending" };
      case "EXPAND_IMG_FULFILLED":
        console.log("in generate")
        return {
          ...state,
          download: action.payload.data.result_url,
          url: action.payload.resultUrl,
          status: "success",
        };
      case "EXPAND_IMG_FAILED":
        return { ...state, status: "failed" };
      default:
        return state;
    }
  };
  
  export default expandimg;
  