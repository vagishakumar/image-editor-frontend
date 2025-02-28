
const initialState = {
    status: null,
  };
  
  const BgGeneration = (state = initialState, action) => {
    console.log("action",action.type)
    switch (action.type) {
      case "BG_GENERATION_IMG_PENDING":
        return { ...state, status: "pending" };
      case "BG_GENERATION_IMG_FULFILLED":
        console.log("in generate")
        return {
          ...state,
          download: action.payload.data.result[0],
          url: action.payload.resultUrl,
          status: "success",
        };
      case "BG_GENERATION_IMG_FAILED":
        return { ...state, status: "failed" };
      default:
        return state;
    }
  };
  
  export default BgGeneration;
  