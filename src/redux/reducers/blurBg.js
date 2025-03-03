const initialState = {
  status: null,
};

const BlurBg = (state = initialState, action) => {
  switch (action.type) {
    case "BLUR_BG_IMG_PENDING":
      return { ...state, status: "pending" };
    case "BLUR_BG_IMG_FULFILLED":
      return {
        ...state,
        download: action.payload.data.result_url,
        url: action.payload.resultUrl,
        status: "success",
      };
    case "BLUR_BG_IMG_FAILED":
      return { ...state, status: "failed" };
    default:
      return state;
  }
};

export default BlurBg;
