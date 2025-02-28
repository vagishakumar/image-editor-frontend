
const initialState = {
    status: null,
  };
  
  const RemoveForeground = (state = initialState, action) => {
    console.log("action",action.type)
    switch (action.type) {
      case "REMOVE_FOREGROUND_IMG_PENDING":
        return { ...state, status: "pending" };
      case "REMOVE_FOREGROUND_IMG_FULFILLED":
        console.log("in generate")
        return {
          ...state,
          download: action.payload.data.result_url,
          url: action.payload.resultUrl,
          status: "success",
        };
      case "REMOVE_FOREGROUND_IMG_FAILED":
        return { ...state, status: "failed" };
      default:
        return state;
    }
  };
  
  export default RemoveForeground;
  