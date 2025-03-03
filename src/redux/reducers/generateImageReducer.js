
const initialState = {
  status: null,
};

const generateImageReducer = (state = initialState, action) => {
  console.log("action",action.type)
  switch (action.type) {
    case "GENERATE_IMG_PENDING":
      return { ...state, status: "pending" };
    case "GENERATE_IMG_FULFILLED":
      console.log("in generate")
      return {
        ...state,
        download: action.payload.data.result[0].urls[0],
        url: action.payload.resultUrl,
        status: "success",
      };
    case "GENERATE_IMG_FAILED":
      return { ...state, status: "failed" };
    default:
      return state;
  }
};

export default generateImageReducer;
