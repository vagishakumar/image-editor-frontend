const initialState = {
  historyList: [],
  status: null,
};

const eraseObjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ERASE_OBJECT_PENDING":
      return { ...state, status: "pending" };
    case "ERASE_OBJECT_FULFILLED":
      return {
        ...state,
        download: action.payload.data.result_url,
        url: action.payload.resultUrl,
        status: "success",
      };
    case "ERASE_OBJECT_FAILED":
      return { ...state, status: "failed" };
    default:
      return state;
  }
};

export default eraseObjectReducer;
