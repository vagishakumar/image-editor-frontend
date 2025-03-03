
const initialState = {
    status: null,
  };
  
  const IncreaseResolution = (state = initialState, action) => {
    console.log("action",action.type)
    switch (action.type) {
      case "INCREASE_RESOLUTION_IMG_PENDING":
        return { ...state, status: "pending" };
      case "INCREASE_RESOLUTION_IMG_FULFILLED":
        console.log("in generate")
        return {
          ...state,
          download: action.payload.data.result_url,
          url: action.payload.resultUrl,
          status: "success",
        };
      case "INCREASE_RESOLUTION_IMG_FAILED":
        return { ...state, status: "failed" };
      default:
        return state;
    }
  };
  
  export default IncreaseResolution;
  