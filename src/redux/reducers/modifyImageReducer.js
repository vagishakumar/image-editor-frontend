const initialState = {
  uploadMaskImgUrl: null,
  status: null,
  error: null,
  loading: false,
};

const maskImgReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MODIFY_IMG_PENDING":
      return { ...state, status: "pending" };
    case "MODIFY_IMG_FULFILLED": {
      return {
        ...state,
        url: action.payload.resultUrl,
        download: action.payload.data.urls[0],
      };
    }
    case "MODIFY_IMG_FAILED":
      return { ...state, status: "failed" };
    default:
      return state;
  }
};

export default maskImgReducer;
