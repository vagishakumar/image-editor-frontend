const initialState = {
  status: null,
};

const expandimg = (state = initialState, action) => {
  switch (action.type) {
    case "EXPAND_IMG_PENDING":
      return { ...state, status: "pending" };
    case "EXPAND_IMG_FULFILLED":
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
