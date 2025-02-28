const initialState = {
  historyList: [],
  status: null,
};

const removeBgReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REMOVE_BG_PENDING":
      return { ...state, status: "pending" };
    case "REMOVE_BG_FULFILLED":
      return {
        ...state,
        download: action.payload.data.result_url,
        url: action.payload.resultUrl,
        status: "success",
      };
    case "REMOVE_BG_FAILED":
      return { ...state, status: "failed" };
    default:
      return state;
  }
};

export default removeBgReducer;
