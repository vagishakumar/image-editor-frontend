const initialState = {
  status: null,
};

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_IMG_PENDING":
      return { ...state, status: "pending" };
    case "UPLOAD_IMG_FULFILLED":
      return {
        ...state,
        url: action.payload.imageUrl,
        status: "success",
      };
    case "UPLOAD_IMG_FAILED":
      return { ...state, status: "failed" };
    case "SET_UPLOADED_IMG_URL":
      return { ...state, url: action.payload };
    default:
      return state;
  }
};

export default uploadReducer;
